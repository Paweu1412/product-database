import { Request, Response } from 'express';
import databasePool from '../app';

import { isNumeric } from '../utils/helper.utils';

exports.listOfProducts = (_req: Request, res: Response) => {
    databasePool.query('SELECT id, name FROM products', function (_err: string, result: string[], _fields: string) {
        result = Object.values(JSON.parse(JSON.stringify(result)));

        return res.send(result);
    });
}

exports.detailsOfProduct = (req: Request, res: Response) => {
    function itemNotFound() {
        return res.json({
            message: 'Item not found'
        }); 
    }

    if (!req.params.id) {
        return res.json({
            message: 'You have to provide a product id'
        }); 
    }

    if (!isNumeric(req.params.id)) { return itemNotFound(); }

    databasePool.query('SELECT name, price, updateDate FROM products WHERE id=?;', [req.params.id], (_err: any, result: string[], _fields: any) => {
        result = Object.values(JSON.parse(JSON.stringify(result)));
        if (result.length === 0) { return itemNotFound(); }

        return res.send(result);
    });
}

exports.addNewProduct = (req: Request, res: Response) => {
    if (!req.body.name || !req.body.price ) { 
        return res.json({
            message: `You have to provide ${(!req.body.name && !req.body.price) ? 'a name and price' : ((!req.body.name) ? 'a name' : 'price')}`
        }); 
    }

    if (req.body.name.length > 100) { 
        return res.json({
            message: `You can provide a name with a maximum length of 100 characters`
        }); 
    }

    databasePool.query('INSERT INTO products (name, price, updateDate) VALUES (?, ?, CURRENT_DATE);', [req.body.name, req.body.price] , (err) => {
        if (!err) {
            return res.json({
                message: `Operation successful`
            }); 
        }
    });

    return res.json({
        message: `Something has gone wrong`
    }); 
}

exports.updateProduct = (req: Request, res: Response) => {
    if (!req.params.id || !isNumeric(req.params.id)) {
        return res.json({
            message: `You have to provide a product id`
        }); 
    }

    if (!req.body.name || !req.body.price) { 
        return res.json({
            message: `You have to provide ${(!req.body.name && !req.body.price) ? 'a name and price' : ((!req.body.name) ? 'a name' : 'price')}`
        }); 
    }

    databasePool.query('UPDATE products SET name=?, price=?, updateDate=CURRENT_DATE WHERE id=?;', [req.body.name, req.body.price, req.params.id], (err, result) => {
        if (!err) {
            if (result.changedRows === 0) {
                return res.json({
                    message: 'The product with provided id does not exist or data entered is the same, nothing has changed'
                }); 
            }

            return res.json({
                message: 'Operation successful'
            }); 
        }
    });
}

exports.deleteProduct = (req: Request, res: Response) => {
    if (!req.params.id || !isNumeric(req.params.id)) {
        return res.json({
            message: 'You have to provide a product id'
        }); 
    }

    databasePool.query('DELETE FROM products WHERE id=?', [req.params.id], (err, result) => {
        if (!err) {
            if (result.affectedRows === 0) {
                return res.json({
                    message: 'The product with provided id does not exist, nothing has changed'
                }); 
            }

            return res.json({
                message: 'Operation successful'
            }); 
        }
    });
}