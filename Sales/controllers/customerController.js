const Customer = require("../models/customerModel");

exports.getCustomers = (req, res, next) => {
    Customer.fetchAll()
            .then(( rows, fieldData) => {
            // console.log( "rows="); console.log( rows );
            res.render( 'customers/mainCustomers', {
                from: 'Customers',
                customers: rows[0]
            })
        })
}
exports.editCustomer = ( req, res, next ) => {
    let id = req.params.id;
    console.log( "Inside Edit .... id=" + id );
    // fetch all the records and find the idth one
    Customer.findById(id)
        .then ((rows, fieldData) =>{
            res.render( 'customers/updateCustomers', {
                id : rows[0].id,
                from: 'Customers',
                customer: rows[0][0]
            })
        }).catch( err => {
        console.log( "DB Error=>");
        console.log( err );
    })
}
exports.postUpdateCustomer = ( req, res, next ) => {
    let id = req.body.customerId;
    console.log(`id: ${id}`);
    let name = req.body.name; // post requests uses data in the body so use body instead of params(used for get requests)
    let email = req.body.email;
    const customer = new Customer(name, email);
    // asynchronous command, happens in the background and skips to the next statement (.then is needed)
    customer.update(id).then ((rows, fieldData) => {
        res.redirect("/customers");
    }).catch(err => {
        console.log("Dang it error"); console.log(err);
    });
}
exports.getAddCustomer = ( req, res, next) => {
    res.render( 'customers/addCustomers',
        {
            from: 'Customers'
        })
}
exports.postAddCustomer = ( req, res, next) => {
    let n = req.body.name;
    let e = req.body.email;
    const customer = new Customer(n, e);
    customer.save();
    res.redirect("/customers");
}