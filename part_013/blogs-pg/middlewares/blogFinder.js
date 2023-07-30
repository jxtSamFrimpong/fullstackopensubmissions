const { Blog } = require('../models')
const logger = require('../utils/logger')

const blogFinder = async (req, res, next) => {
    try {
        console.log(typeof req.params.id)
        req.blog = await Blog.findByPk(req.params.id)
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = blogFinder