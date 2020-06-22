const express = require('express');
const menuItemsRouter = express.Router({mergeParams: true});

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

menuItemsRouter.param('menuItemId', (req, res, next, menuItemId) => {
    const sql = 'SELECT * FROM MenuItem WHERE MenuItem.id = $menuItemId';
    const values = {$menuItemId: menuItemId};

    db.get(sql, values, (err, menuItem) => {
        if (err) {
            next(err);
        } else if (menuItem) {
            next();
        } else {
            res.sendStatus(404);
        }
    });
});