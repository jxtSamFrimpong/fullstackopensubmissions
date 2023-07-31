const router = require('express').Router()
const bcrypt = require('bcrypt')
const { PasswordError } = require('../middlewares/typeValidators')

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] }
        },
        attributes: {
            exclude: ['passwordHash', 'createdAt', 'updatedAt']
        }
    })
    res.json(users)
})

router.post('/', async (req, res) => {
    const { username, name, password } = req.body
    if (password === undefined || password === null) {
        throw new PasswordError('Password validation failed: password: Path `password` is required.')
    }
    if (password.length < 6) {
        throw new PasswordError('Password validation failed: password: Error, expected password to be a string of at least 6 characters')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = await User.create({ name, username, passwordHash })
    res.status(201).json({ username: user.username, name: user.name, createdAt: user.createdAt })
})

router.put('/:username', async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })
    if (user) {
        user.username = req.body.username
        await user.save()
        res.json({ username: user.username, name: user.name, updatedAt: user.updatedAt })
    } else {
        res.status(404).end()
    }
})

module.exports = router