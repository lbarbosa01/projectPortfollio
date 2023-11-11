const db = require("../util/database");

module.exports = class Item {
    constructor(name, price ) {
        this.name = name;
        this.price = price;
    }
    save() {
        return db.execute( 'insert into item (ItemName, ItemPrice) ' +
            'values (?, ?)',
            [this.name, this.price ]
        )
    }
    static fetchAll(){
        return db.execute("SELECT i.ItemName, COALESCE(SUM(i.ItemPrice * s.Quantity),0) AS TotalSales \n" +
            "FROM item i\n" +
            "Left JOIN sales s ON i.ItemID = s.ItemID\n" +
            "GROUP BY i.ItemName Order BY TotalSales DESC");
    }
    static findById( id ){
        return db.execute( "select * from item where ItemID = ?",
            [id] );
    }
    update ( id ){
        return db.execute( "UPDATE item SET ItemName = ?, ItemPrice = ? WHERE ItemID = ?",
            [this.name, this.price, id ] );
    }
}
