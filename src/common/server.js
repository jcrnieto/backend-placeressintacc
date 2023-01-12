const dotenv = require('dotenv');
/*
const NODE_ENV = process.env.NODE_ENV
console.log('process.env.NODE_ENV', NODE_ENV);*/
dotenv.config();
//{ path:`./.env.${NODE_ENV}` }
module.exports = {
  SERVER_PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
};