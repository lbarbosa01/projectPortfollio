const db = require("../util/database");

module.exports = class Customer {
    constructor(name, email ) {
        this.name = name;
        this.email = email;
    }
    save() {
        return db.execute( 'insert into customer (CustomerName, CustomerEmail) ' +
            'values (?, ?)',
            [this.name, this.email ]
        )
    }
    static fetchAll(){
        return db.execute("SELECT c.CustomerName, c.CustomerEmail , c.CustomerID, " +
            "COALESCE(SUM(i.ItemPrice * s.Quantity),0) AS TotalSales " +
            "FROM customer c LEFT JOIN sales s ON c.CustomerID = s.CustomerID " +
            "LEFT JOIN item i ON s.ItemID = i.ItemID GROUP BY c.CustomerName " +
            "order by TotalSales DESC");
    }
    static findById( id ){
        return db.execute( "select * from customer where CustomerID = ?",
            [id] );
    }
    update ( id ){
        return db.execute( "UPDATE customer SET CustomerName = ?, CustomerEmail = ? WHERE CustomerID = ?",
            [this.name, this.email, id ] );
    }

    static delete(id) {
        return db.execute("DELETE FROM customer WHERE CustomerID = ?",
            [id])
    }
}
