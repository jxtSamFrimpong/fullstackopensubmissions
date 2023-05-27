/* eslint-disable indent */
const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)


describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await api.get('/api/users')

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await api.get('/api/users')
        expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1)

        const usernames = usersAtEnd.body.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})