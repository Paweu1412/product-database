import express from 'express';

const router = express.Router();

const ApplicationControllers = require('../controllers/app.controllers');

router.get('/list', ApplicationControllers.listOfProducts);
router.get('/details/:id', ApplicationControllers.detailsOfProduct);

module.exports = router;