require('dotenv').config()

const PORT = process.env.PORT
const DATABASE_URL = process.env.NODE_ENV === 'test'
    ? process.env.DATABASE_URL_TEST
    : process.env.DATABASE_URL
const SECRET = process.env.SECRET
module.exports = {
    DATABASE_URL,
    PORT,
    SECRET
}