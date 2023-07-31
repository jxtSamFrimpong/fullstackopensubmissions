const router = require('express').Router()
const { Blog, User } = require('../models')
const { Op } = require('sequelize')
const { sequelize } = require('../utils/db')

router.get('/', async (req, res) => {
    const authorBlogs = await Blog.findAll({
        attributes: ['author', [sequelize.fn('COUNT', sequelize.col('id')), 'articles'], [sequelize.fn('SUM', sequelize.col('likes')), 'likes']],
        group: ['author'],
        order: [
            ['likes', 'DESC'],
            ['author', 'ASC']
        ]
    })
    res.json(authorBlogs)
})

module.exports = router