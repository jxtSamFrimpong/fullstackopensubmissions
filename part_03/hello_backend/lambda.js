/* eslint-disable indent */
const serverless = require('serverless-http')
const config = require('./utils/config')
const app = require('./app')

const handler = serverless(app);

// module.exports = {
//     handler
// };

exports.handler = handler;