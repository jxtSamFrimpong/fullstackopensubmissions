const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response, next) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(err => {
            next(err)
        })
})

blogsRouter.get('/:id', (request, response, next) => {
    const { id } = request.params;
    Blog.findById(id)
        .then(blog => response.json(blog))
        .catch(err => next(err));
})

blogsRouter.post('/', (request, response, next) => {
    const { title, author, url, likes } = request.body
    const blog = new Blog({ title, author, url, likes })

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })
})

blogsRouter.put('/:id', (request, response, next) => {
    const { id } = request.params;
    const { title, author, url, likes } = request.body

    Blog.findByIdAndUpdate(id, { title, author, url, likes }, { new: true, runValidators: true, context: 'query' })
        .then(updatedBlog => response.json(updatedBlog))
        .catch(err => next(err))
})

blogsRouter.delete('/:id', (request, response, next) => {
    const { id } = request.params;

    Blog.findByIdAndRemove(id)
        .then(results => response.json(results))
        .catch(err => next(err))
})

module.exports = blogsRouter;