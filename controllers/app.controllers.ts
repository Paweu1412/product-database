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
            message: `Item not found`
        }); 
    }

    if (!req.params.id) {
        return res.json({
            message: `A product ID isn't provided`
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
            message: `${(!req.body.name && !req.body.price) ? 'A name and price are' : ((!req.body.name) ? 'A name is' : 'A price is')}n't provided`
        }); 
    }

    if (req.body.name.length > 100) { 
        return res.json({
            message: `Name is too long (maximum 100 characters).`
        }); 
    }

    databasePool.query('INSERT INTO products (name, price, updateDate) VALUES (?, ?, CURRENT_DATE);', [req.body.name, req.body.price] , (err: any) => {
        if (!err) {
            return res.json({
                message: `Operation successful`
            }); 
        }

        return res.json({
            message: `Something went wrong`
        }); 
    });

}

exports.updateProduct = (req: Request, res: Response) => {
    if (!req.params.id || !isNumeric(req.params.id)) {
        return res.json({
            message: `Product ID can't be blank`
        }); 
    }

    if (!req.body.name || !req.body.price) { 
        return res.json({
            message: `${(!req.body.name && !req.body.price) ? 'A name and price are' : ((!req.body.name) ? 'A name is' : 'A price is')}n't provided`
        }); 
    }

    databasePool.query('UPDATE products SET name=?, price=?, updateDate=CURRENT_DATE WHERE id=?;', [req.body.name, req.body.price, req.params.id], (err, result) => {
        if (!err) {
            if (result.changedRows === 0) {
                return res.json({
                    message: `The product ID doesn't exist or entered data already exists, no changes have been made`
                }); 
            }

            return res.json({
                message: `Operation successful`
            }); 
        }
    });
}

exports.deleteProduct = (req: Request, res: Response) => {
    if (!req.params.id || !isNumeric(req.params.id)) {
        return res.json({
            message: `A product ID isn't provided`
        }); 
    }

    databasePool.query('DELETE FROM products WHERE id=?', [req.params.id], (err: any, result: any) => {
        if (!err) {
            if (result.affectedRows === 0) {
                return res.json({
                    message: `The product with provided ID doesn't exist, no changes have been made`
                }); 
            }

            return res.json({
                message: `Operation successful`
            }); 
        }
    });
}