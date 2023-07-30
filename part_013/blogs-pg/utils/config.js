/* eslint-disable indent */
require('dotenv').config()

const PORT = process.env.PORT
const DATABASE_URL = process.env.NODE_ENV === 'test'
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL
module.exports = {
    DATABASE_URL,
    PORT
}