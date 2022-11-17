import express from 'express';

const router = express.Router();

const ApplicationControllers = require('../controllers/app.controllers');

router.get('/products', ApplicationControllers.listOfProducts);

router.get('/products/:id', ApplicationControllers.detailsOfProduct);

router.post('/products', ApplicationControllers.addNewProduct);

router.put('/products/:id', ApplicationControllers.updateProduct);

router.delete('/products/:id', ApplicationControllers.deleteProduct);

module.exports = router;