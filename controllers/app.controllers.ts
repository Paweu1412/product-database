import { Request, Response } from 'express';
import databasePool from '../app';

import { isNumeric } from '../utils/helper.utils';

exports.listOfProducts = (_req: Request, res: Response) => {
    databasePool.query(`SELECT id, name FROM products`, function (_err: string, result: string[], _fields: string) {
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

    if (!isNumeric(req.params.id)) { return itemNotFound(); }

    let idFromHeader: any = parseInt(req.params.id);
    if (!idFromHeader) { return itemNotFound(); }
    
    databasePool.query(`SELECT name, price, updateDate FROM products WHERE id=${idFromHeader}`, function (_err: string, result: string[], _fields: string) {
        result = Object.values(JSON.parse(JSON.stringify(result)));
        if (result.length === 0) { return itemNotFound(); }

        return res.send(result);
    });
}