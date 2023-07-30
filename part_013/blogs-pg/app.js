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
// app.use(unknownEndpoint)
// app.use(errorHandler)
logger.info('application started')
logger.info('blogs')
Blog.findAll().then(i => logger.info(i))

app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

module.exports = app;