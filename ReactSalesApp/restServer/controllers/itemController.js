const Item = require("../models/itemModel");

exports.getItems = (req, res, next) => {
    Item.fetchAll()
        .then(( rows, fieldData ) => {
            // console.log( "Rows="); console.log( rows );
            res.status(200).json( rows[0]);
        });
}
exports.getItemDetails = ( req, res, next ) => {
    let id = req.params.id;
    Item.findById(id)
        .then ((rows, fieldData) => {
            // console.log("ROWS=>");
            res.status(200).json( rows[0][0]);
        }).catch( err => {
        console.log( "DB Error=>");
        console.log( err );
    })
}
exports.postAddItem = ( req, res, next) => {
    console.log( "FL0->"); console.log( req.body );
    let n = req.body.item;
    let p = req.body.price;
    let obj = { n, p};
    console.log( "FL1"); console.log( obj );
    const item = new Item( n, p );
    item.save().then ((rows, fieldData) => {
        res.redirect("/items");
    }).catch(err => {
        console.log("Dang it error"); console.log(err);
    });
}