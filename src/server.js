const express = require('express');
const helmet = require('helmet');
const json = express.json;
const morgan = require('morgan');
const session = require('express-session');
const sessionStore = require('connect-session-knex')(session);

const server = express();

const seshOpts = {
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60
  },
  name: 'seshid',
  resave: false,
  saveUninitialized: false,
  secret: 'ilikeunicornsbecauseilikeunicornsokay',
  store: new sessionStore({
    clearInterval: 1000 * 60 * 60,
    createtable: true,
    knex: require('./database'),
    sidfieldname: 'sid',
    tablename: 'sessions'
  })
};

server.use(helmet());
server.use(json());
server.use(morgan('dev'));
server.use(session(seshOpts));

server.get('/', (req, res) => res.json({
  message: "Simple User API",
  success: true
}));

server.use('/api', require('./routes'));

module.exports = server;