const Customer = require("../models/customerModel");

exports.getCustomers = (req, res, next) => {
    Customer.fetchAll()
        .then(( rows, fieldData ) => {
            console.log( "Rows="); console.log( rows );
            res.status(200).json( rows[0]);
        });
}
exports.getCustomerDetails = ( req, res, next ) => {
    let id = req.params.id;
    Customer.findById(id)
        .then ((rows, fieldData) => {
            res.status(200).json( rows[0][0]);
        }).catch( err => {
        console.log( "DB Error=>");
        console.log( err );
    })
}
exports.editCustomer = ( req, res, next ) => {
    let id = req.params.id;
    console.log( "Inside Edit .... id=" + id );
    // fetch all the records and find the idth one
    Customer.findById(id)
        .then ((rows, fieldData) =>{
            res.render( `customers/${id}`, {
                id : rows[0].id,
                from: 'Customers',
                customer: rows[0]
            })
        }).catch( err => {
        console.log( "DB Error=>");
        console.log( err );
    })
}
exports.postAddCustomer = ( req, res, next) => {
    console.log( "FL0->"); console.log( req.body );
    let n = req.body.name;
    let e = req.body.email;
    let obj = { n, e};
    console.log( "FL1"); console.log( obj );
    const customer = new Customer( n, e );
    customer.save().then ((rows, fieldData) => {
        res.redirect("/customers");
    }).catch(err => {
        console.log("Dang it error"); console.log(err);
    });
}

exports.postUpdateCustomer = ( req, res, next ) => {
    let id = req.params.id;
    console.log(`id: ${id}`);
    let name = req.body.name;
    let email = req.body.email;
    const customer = new Customer(name, email);
    customer.update(id).then ((rows, fieldData) => {
        res.redirect("/customers");
    }).catch(err => {
        console.log("Dang it error"); console.log(err);
    });
}

exports.postDeleteCustomer = ( req, res, next ) => {
    let id = req.params.id;
    console.log(`id: ${id}`);
    Customer.delete(id).then ((rows, fieldData) => {
        res.redirect("/customers");
    }).catch(err => {
        console.log("Dang it error"); console.log(err);
    });
}