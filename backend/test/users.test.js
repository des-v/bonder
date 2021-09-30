const request = require('supertest')
const app = require('../src/app')

describe('Users endpoint', () => {
  it('post request to /users should create a user', async () => {
    const userToCreate = {
      username: `IamSoUnique${Math.random()}`,
      firstName: 'Anna',
      lastName: 'Doe',
      email: 'anna.doe@example.com',
    }

    const createdUser = (await request(app).post('/api/users').send(userToCreate)).body
    expect(createdUser.username).toBe(userToCreate.username)
    expect(createdUser.firstName).toBe(userToCreate.firstName)
    expect(createdUser.lastName).toBe(userToCreate.lastName)
    expect(createdUser.email).toBe(userToCreate.email)
  })

  it('get request to /users should list users', async () => {
    const userList = (await request(app).get('/api/users')).body
    const usersExist = userList.length > 0

    expect(usersExist).toBe(true)
  })
})
