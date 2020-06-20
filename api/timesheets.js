const express = require('express');
const timesheetsRouter = express.Router({mergeParams: true});

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

timesheetsRouter.param('timesheetId', (req, res, next, timesheetId) => {
    const sql = 'SELECT * FROM Timesheet WHERE Timesheet.id = $timesheetId';
    const values = {$timesheetId: timesheetId};

    db.get(sql, values, (err, timesheet) => {
        if (err) {
            next(err);
        } else if (timesheet) {
            next();
        } else {
            res.sendStatus(404);
        }
    });
});
