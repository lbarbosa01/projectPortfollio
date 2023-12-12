const Sales = require("../models/salesModel");

exports.getOrderedSales = (req, res, next) => {
    Sales.fetchAllStats()
        .then((rows, fieldData) => {
            res.status(200).json(rows[0]);
        });
}