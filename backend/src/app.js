const createError = require('http-errors')

const express = require('express')

const path = require('path')

const cookieParser = require('cookie-parser')

const logger = require('morgan')

const session = require('express-session')

const MongoStore = require('connect-mongo')(session)

const passport = require('passport')

const cors = require('cors')

const mongooseConnection = require('./database-connection')

const socketService = require('./socket-service')

const User = require('./models/person')

const indexRouter = require('./routes/index')

const usersRouter = require('./routes/users')

const accountsRouter = require('./routes/accounts')

const app = express()

app.use(cors({
  origin: true,
  credentials: true
}))

// if (app.get('env') == 'development') {
//   /* eslint-disable-next-line */
//   app.use(require('connect-livereload')({ port: 35729 }))
//   /* eslint-disable-next-line */
//   require('livereload')
//     .createServer({ extraExts: ['pug'] })
//     .watch([`${__dirname}/public`, `${__dirname}/views`])
// }

app.set('trust proxy', 1)

app.set('io', socketService)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(
  session({
    secret: ['thisisnotasupersecuresecretsecret', 'thisisanothernotasupersecuresecretsecret'],
    store: new MongoStore({
      mongooseConnection,
      stringify: false,
    }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/api',
      sameSite: 'none',
      secure: true,
    },
  })
)

// Configure passport middleware
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(express.static(path.join(__dirname, 'public')))

// set session view count
app.use('/api', (req, res, next) => {
  req.session.viewCount = req.session.viewCount || 0
  // eslint-disable-next-line no-plusplus
  req.session.viewCount++
  next()
})


app.use('/api/', indexRouter)
app.use('/api/account', accountsRouter)
app.use('/api/users', usersRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = error.message
  res.locals.error = req.app.get('env') === 'development' ? error : {}

  // render the error page
  res.status(error.status || 500)
  res.render('error')

  res.send({
    status: error.status,
    message: error.message,
    stack: req.app.get('env') == 'development' ? error.stack : '',
  })

})

console.log(`It's alive`)

module.exports = app
