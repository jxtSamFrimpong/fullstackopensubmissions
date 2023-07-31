const router = require('express').Router()
const { Blog, User } = require('../models')
const blogFinder = require('../middlewares/blogFinder')
const { PostBlogTypeValidatorError } = require('../middlewares/typeValidators')
const { tokenExtractor } = require('../middlewares/auth')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
    let whereConditions = {}
    if (req.query.search) {
        whereConditions = {
            [Op.or]: [
                { title: { [Op.iLike]: `%${req.query.search}%` } },
                { author: { [Op.iLike]: `%${req.query.search}%` } }
            ]
        }
    }
    const blogs = await Blog.findAll({
        attributes: {
            exclude: ['userId']
        },
        include: {
            model: User,
            attributes: ['name']
        },
        where: whereConditions,
        order: [
            ['likes', 'DESC'],
            ['title', 'ASC']
        ]
    })
    res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
    if (!req.blog) {
        res.statusCode = 404
        return res.send(null)
    }
    res.json(req.blog)
})

router.post('/', tokenExtractor, async (req, res) => {
    if ((typeof req.body.url !== 'string') || (req.body.author && typeof req.body.author !== 'string') || (req.body.title && typeof req.body.title !== 'string') || (req.body.likes && typeof req.body.likes !== 'number')) {
        throw new PostBlogTypeValidatorError('Check the JSON payload, one of the fields has invalid data type')
    }
    const user = await User.findByPk(req.decodedToken.id)
    if (!user) {
        return res.status(400).json({ error: "invalid token, user not found for given token" })
    }
    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.json(blog)
})

router.put('/:id', tokenExtractor, blogFinder, async (req, res) => {
    if (!req.blog) {
        res.statusCode = 404
        return res.end()
    }
    if (req.blog.userId !== req.decodedToken.id) {
        return res.status(401).end()
    }
    if ((req.body.url && typeof req.body.url !== 'string') || (req.body.author && typeof req.body.author !== 'string') || (req.body.title && typeof req.body.title !== 'string') || (req.body.likes && typeof req.body.likes !== 'number')) {
        throw new PostBlogTypeValidatorError('Check the JSON payload, one of the fields has invalid data type')
    }
    if (req.body.author) {
        req.blog.author = req.body.author
    }
    if (req.body.url) {
        req.blog.url = req.body.url
    }
    if (req.body.title) {
        req.blog.title = req.body.title
    }
    if (req.body.likes) {
        req.blog.likes = req.body.likes
    }
    await req.blog.save()
    res.json(req.blog)
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
    if (!req.blog) {
        res.statusCode = 404
        return res.end()
    }
    if (req.blog.userId !== req.decodedToken.id) {
        return res.status(401).end()
    }
    await req.blog.destroy()
    res.statusCode = 204
    res.end()
})

module.exports = router;