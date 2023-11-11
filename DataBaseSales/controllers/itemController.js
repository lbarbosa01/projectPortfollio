const Item = require("../models/itemModel");

exports.getItems = (req, res, next) => {
    Item.fetchAll()
        .then(( rows, fieldData) => {
            // console.log( "rows="); console.log( rows );
            res.render( 'items/mainItems', {
                from: 'Products',
                items: rows[0]
            })
        })
}
exports.getAddItem = ( req, res, next) => {
    res.render( 'items/addItems',
        {
            from: 'Products'
        })
}
exports.postAddItem = ( req, res, next) => {
    let n = req.body.name;
    let p = req.body.price;
    const item = new Item(n, p);
    item.save();
    res.redirect("/items");
}