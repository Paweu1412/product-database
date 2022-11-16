import express from 'express';

const router = express.Router();

const ApplicationControllers = require('../controllers/ApplicationController');

router.get('/list', ApplicationControllers.listOfProducts);

module.exports = router;