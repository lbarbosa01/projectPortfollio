const Sales = require("../models/salesModel");

exports.getSales = (req, res, next) => {
    Sales.fetchAll()
        .then(( rows, fieldData ) => {
            console.log( "Rows="); console.log( rows );
            res.status(200).json( rows[0]);
        });
}