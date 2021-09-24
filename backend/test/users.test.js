const request = require('supertest')
const app = require('../src/app')

describe('Users endpoint', () => {
  test('it should pass', () => {
    expect(true).toBe(true)
  })

  it('post request to /users should create a user', async () => {
    const userToCreate = {
      firstName: 'Anna',
      lastName: 'Doe',
      email: 'anna.doe@example.com',
      bio: 'Artist on the move',
    }

    const createdUser = (await request(app).post('/users').send(userToCreate)).body
    expect(createdUser.firstName).toBe(userToCreate.firstName)
    expect(createdUser.lastName).toBe(userToCreate.lastName)
    expect(createdUser.email).toBe(userToCreate.email)
    expect(createdUser.bio).toBe(userToCreate.bio)
  })

  it('get request to /users should list users', async () => {
    const userList = (await request(app).get('/users')).body
    const usersExist = userList.length > 0

    expect(usersExist).toBe(true)
  })
})
