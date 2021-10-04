const createError = require('http-errors')

const express = require('express')

const path = require('path')

const cookieParser = require('cookie-parser')

const logger = require('morgan')

const session = require('express-session')

const MongoStore = require('connect-mongo')

const passport = require('passport')

const mongoose = require('mongoose')

const mongooseConnection = require('./database-connection')

const User = require('./models/person')

const indexRouter = require('./routes/index')

const usersRouter = require('./routes/users')

const accountsRouter = require('./routes/accounts')

const app = express()

// if (app.get('env') == 'development') {
//   /* eslint-disable-next-line */
//   app.use(require('connect-livereload')({ port: 35729 }))
//   /* eslint-disable-next-line */
//   require('livereload')
//     .createServer({ extraExts: ['pug'] })
//     .watch([`${__dirname}/public`, `${__dirname}/views`])
// }

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

const clientPromise = new Promise((resolve, reject) => {
  resolve(mongooseConnection.getClient())
  reject(new Error('MongoClient Error'))
})

app.use(
  session({
    secret: ['thisisnotasupersecuresecretsecret', 'thisisanothernotasupersecuresecretsecret'],
    store: MongoStore.create({
      clientPromise, stringify: false,
    }),
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      path: '/api',
    }
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
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

console.log(`It's alive`)

module.exports = app
