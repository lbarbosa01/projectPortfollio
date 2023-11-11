const Sales = require("../models/salesModel");

exports.getSales = (req, res, next) => {
    Sales.fetchAll()
        .then(( rows, fieldData) => {
            // console.log( "rows="); console.log( rows );
            res.render( 'sales/mainSales', {
                from: 'Sales',
                sales: rows[0]
            })
        })
}