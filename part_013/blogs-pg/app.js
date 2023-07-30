const express = require('express')
// require('express-async-errors')
const { Sequelize, Model, DataTypes } = require('sequelize')
const logger = require('./utils/logger')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())


const sequelize = new Sequelize(process.env.DATABASE_URL);
class Blog extends Model { }
Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.STRING(255),
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
})
Blog.sync()
// app.use(unknownEndpoint)
// app.use(errorHandler)

app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        res.json(blog)
    } catch (err) {
        res.statusCode = 404
        res.json(JSON.stringify(err))
    }
})

app.post('/api/blogs', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

app.put('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        if (req.body.author) {
            blog.author = req.body.author
        }
        if (req.body.url) {
            blog.url = req.body.url
        }
        if (req.body.title) {
            blog.title = req.body.title
        }
        if (req.body.likes) {
            blog.likes = req.body.likes
        }
        await blog.save()
        res.json(blog)
    } catch (err) {
        res.status(404).end()
    }
})

app.delete('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    try {
        await blog.destroy()
        res.statusCode = 204
        res.end()
    } catch (err) {
        res.statusCode = 204
        res.end()
    }
})

module.exports = app;