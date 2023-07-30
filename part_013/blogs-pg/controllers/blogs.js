const router = require('express').Router()
const { Blog } = require('../models')
const blogFinder = require('../middlewares/blogFinder')
const { PostBlogTypeValidatorError } = require('../middlewares/typeValidators')

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
    if (!req.blog) {
        res.statusCode = 404
        return res.send(null)
    }
    res.json(req.blog)
})

router.post('/', async (req, res) => {
    if ((typeof req.body.url !== 'string') || (req.body.author && typeof req.body.author !== 'string') || (req.body.title && typeof req.body.title !== 'string') || (req.body.likes && typeof req.body.likes !== 'number')) {
        throw new PostBlogTypeValidatorError('Check the JSON payload, one of the fields has invalid data type')
    }
    const blog = await Blog.create(req.body)
    return res.json(blog)
})

router.put('/:id', blogFinder, async (req, res) => {
    if (!req.blog) {
        res.statusCode = 404
        return res.end()
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

router.delete('/:id', blogFinder, async (req, res) => {
    if (!req.blog) {
        res.statusCode = 404
        return res.end()
    }
    await req.blog.destroy()
    res.statusCode = 204
    res.end()
})

module.exports = router;