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


menuItemsRouter.get('/', (req, res, next) => {
    const sql = 'SELECT * FROM MenuItem WHERE MenuItem.menu_id = $menuId';
    const values = {$menuId: req.params.menuId};

    db.all(sql, values, (err, menuItems) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({menuItems: menuItems});
        }
    });
});


menuItemsRouter.post('/', (req, res, next) => {
    const name = req.body.menuItem.name,
            description = req.body.menuItem.description,
            inventory = req.body.menuItem.inventory,
            price = req.body.menuItem.price,
            menuId = req.params.menuId;
    const menuSql = 'SELECT * FROM Menu WHERE Menu.id = $menuId';
    const menuValues = {$menuId: menuId};

    db.get(menuSql, menuValues, (err, menu) => {
        if (err) {
            next(err);
        } else {
            if (!name || !inventory || !price || !menu) {
                return res.sendStatus(400);
            }

            const sql = 'INSERT INTO MenuItem (name, description, inventory, price, menu_id)' +
                    'VALUES ($name, $description, $inventory, $price, $menuId)';
            const values = {
                $name: name,
                $description: description,
                $inventory: inventory,
                $price: price,
                $menuId: menuId
            };

            db.run(sql, values, function(err) {
                if (err) {
                    next(err);
                } else {
                    db.get(`SELECT * FROM MenuItem WHERE MenuItem.id = ${this.lastID}`,
                        (err, menuItem) => {
                            res.status(200).json({menuItem: menuItem});
                        });
                }
            });
        }
    });
});


menuItemsRouter.put('/:menuItemId', (req, res, next) => {
    const name = req.body.menuItem.name,
            description = req.body.menuItem.description,
            inventory = req.body.menuItem.inventory,
            price = req.body.menuItem.price,
            menuId = req.params.menuId;
    cosnt menuSql = 'SELECT * FROM Menu WHERE Menu.id = $menuId';
    const menuValues = {$menuId: menuId};

    db.get(menuSql, menuValues, (err, menu) => {
        if (err) {
            next(err);
        } else {
            if (!name || !inventory || !price || !menu) {
                return res.sendStatus(400);
            }

            const sql = 'UPDATE MenuItem SET name = $name, description = $description, ' +
                    'inventory = $inventory, price = $price, menu_id = $menuId ' +
                    'WHERE MenuItem.id = $menuItemId';
            const values = {};
        }
    });
});