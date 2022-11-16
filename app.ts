import express from 'express';
const app = express();

const routes = require('./routes/index');
const mysql = require('mysql');
require('dotenv').config();

app.listen(8000, () => {});
app.use('/', routes);

module.exports = app;

const databasePool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

export default databasePool;