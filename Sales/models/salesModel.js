const db = require("../util/database");

module.exports = class Sales {
    static fetchAll(){
        return db.execute("SELECT DATE_FORMAT(s.SalesDate, '%Y-%m-%d') AS Date, " +
            "c.CustomerName, i.ItemName AS Product, s.Quantity AS Quantity, " +
            "(i.ItemPrice * s.Quantity) AS TotalSales FROM sales s JOIN " +
            "customer c ON s.CustomerID = c.CustomerID JOIN item i " +
            "ON s.ItemID = i.ItemID WHERE MONTH(s.SalesDate) = MONTH(CURDATE()) " +
            "AND YEAR(s.SalesDate) = YEAR(CURDATE()) ORDER BY Date DESC");
    }
    static fetchAllStats() {
        return db.execute("SELECT\n" +
            "    DATE_FORMAT(s.SalesDate, '%m-%Y') AS Date,\n" +
            "    SUM(i.ItemPrice * s.Quantity) AS TotalSales\n" +
            "FROM\n" +
            "    sales s\n" +
            "JOIN\n" +
            "    customer c ON s.CustomerID = c.CustomerID\n" +
            "JOIN\n" +
            "    item i ON s.ItemID = i.ItemID\n" +
            "GROUP BY MONTH(s.SalesDate) DESC")
    }
}
