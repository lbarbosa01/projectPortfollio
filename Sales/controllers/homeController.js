const Sales = require("../models/salesModel");
const Customer = require("../models/customerModel");
const Item = require("../models/itemModel");

exports.getStats = (req, res, next) => {
    Customer.fetchAll()
        .then((rows1, fieldData) => {
            // console.log( "rows="); console.log( rows1 );
            Item.fetchAll()
                .then((rows2, fieldData) => {
                    Sales.fetchAllStats()
                        .then((rows3, fieldData) => {
                            res.render('home', {
                                from: 'Home',
                                table1: rows1[0],
                                table2: rows2[0],
                                table3: rows3[0],
                            })
                        })
                })
        })
}