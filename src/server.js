const express = require('express');
const helmet = require('helmet');
const json = express.json;
const morgan = require('morgan');

const server = express();

server.use(helmet());
server.use(json());
server.use(morgan('dev'));

server.get('/', (req, res) => res.json({
  message: "Simple User API",
  success: true
}));

server.use('/api', require('./routes'));

module.exports = server;