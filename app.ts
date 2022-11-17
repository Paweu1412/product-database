import express, { Express } from 'express';
const app: Express = express();

import { Pool } from 'mysql';

const bodyParser = require('body-parser');
const routes = require('./routes/app.routes');
const mysql = require('mysql');
require('dotenv').config();

app.listen(8000, () => {});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', routes);

module.exports = app;

const databasePool: Pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

export default databasePool;