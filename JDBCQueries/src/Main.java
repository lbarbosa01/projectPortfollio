// Lemar Barbosa
// Query Program
import java.sql.*; import java.util.*;
public class Main {
    static String query1(String productID) {
        String query = "Select * From Supplier Where supplierid IN " +
                "(Select supplierid From Supplies Where productid IN " +
                "(Select productid From Product Where productid = '" +
                productID + "'))";
        return query;
    }
    static void getQuery1(ResultSet result) throws SQLException {
        System.out.println("Id   Name        Rating     Info");
        while (result.next()) {
            String id = result.getString("supplierId");
            String name = result.getString("supplierName");
            String rating = result.getString("supplierRating");
            String info = result.getString("supplierInfo");
            System.out.println(id + "  " + name + "     "
                    + rating + "      " + info);
        }
        System.out.println("---------------------------------------------");
    }
    static String query2(float value) {
        String query = "Select s.supplierid, p.productid From Supplies s" +
                " JOIN Product p ON s.productid = p.productid Where" +
                " Productcost < " + value;
        return query;
    }
    static void getQuery2(ResultSet result) throws SQLException {
        System.out.println("ProductID     SupplierID");
        while (result.next()) {
            String productid = result.getString("p.productid");
            String supplierid = result.getString("s.supplierid");
            System.out.println(productid + "           " + supplierid);
        }
        System.out.println("----------------------------");
    }
    static String query7() {
        String query = "Select w.widgetid, w.widgetdesc, w.widgetparts, " +
                "w.widgetCondition From Orders o Right JOIN Widget w ON" +
                " o.widgetId = w.widgetId Where o.customerid IS NULL";
        return query;
    }
    static void getQuery7(ResultSet result) throws SQLException{
        System.out.println("WidgetID  Description  Parts  Condition");
        while (result.next()) {
            String widgetid = result.getString("w.widgetid");
            String widgetdesc = result.getString("w.widgetdesc");
            String widgetparts = result.getString("w.widgetparts");
            String widgetcon = result.getString("w.widgetCondition");
            System.out.println(widgetid + "       " + widgetdesc +
                    "         " + widgetparts + "   " + widgetcon);
        }
        System.out.println("----------------------------");
    }
    static String query9() {
        String query = "Select w.widgetid, COALESCE(Quantity, 0) AS total_widgets" +
                " From Orders o Right Join Widget w ON o.widgetID = w.WidgetID" +
                " Group BY widgetid";
        return query;
    }
    static void getQuery9(ResultSet result) throws SQLException {
        System.out.println("WidgetID  TotalWidgets");
        while (result.next()) {
            String widgetid = result.getString("w.widgetid");
            String total = result.getString("total_widgets");
            System.out.println(widgetid + "       " + total);
        }
        System.out.println("----------------------------");
    }
    static String query10() {
        String query = "Select customerid, COUNT(warehouseid) AS total_warehouses " +
        "FROM Orders o GROUP BY customerid";
        return query;
    }
    static void getQuery10(ResultSet result) throws SQLException {
        System.out.println("CustomerID  TotalWarehouses");
        while (result.next()) {
            String customerid = result.getString("customerid");
            String total = result.getString("total_warehouses");
            System.out.println(customerid + "         " + total);
        }
        System.out.println("----------------------------");
    }
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (Exception e) {
            System.out.println("Can't load driver");
        }
        try {
            Scanner scan = new Scanner(System.in);
            System.out.println("Enter Username: "); // username: lbarbosa01
            String user = scan.nextLine();
            System.out.println("Enter Password: "); // password: 995919
            String password = scan.nextLine();
            System.out.println("Enter Database Name: "); // database: hw3lbarbosa01
            String database = scan.nextLine();
            Connection con = DriverManager.getConnection("jdbc:mysql://161.35.177.175/" + database,
                    user, password);
            System.out.println("Connection Established");
            System.out.println("[1]Query1 [2]Query2 [3]Query7 [4]Query9 [5]Query10 [6]Exit Program");
            System.out.println("Select an option: ");
            int select = scan.nextInt();
            while (select != 6) {
                if (select == 1) {
                    System.out.println("Enter ProductID to get Supplier Info: ");
                    String dummy = scan.nextLine();
                    String item = scan.nextLine();
                    PreparedStatement stmt = con.prepareStatement(query1(item));
                    ResultSet result = stmt.executeQuery();
                    getQuery1(result);
                } else if (select == 2) {
                    System.out.println("Enter a VALUE to see the Product/Supplier IDs of products" +
                            " that cost less than that VALUE: ");
                    float value = scan.nextFloat();
                    PreparedStatement stmt = con.prepareStatement(query2(value));
                    ResultSet result = stmt.executeQuery();
                    getQuery2(result);
                } else if (select == 3) {
                    System.out.println("Information for widgets with no sales:");
                    PreparedStatement stmt = con.prepareStatement(query7());
                    ResultSet result = stmt.executeQuery();
                    getQuery7(result);
                } else if (select == 4) {
                    System.out.println("Total amount of widgets ordered by customers:");
                    PreparedStatement stmt = con.prepareStatement(query9());
                    ResultSet result = stmt.executeQuery();
                    getQuery9(result);
                } else if (select == 5) {
                    System.out.println("Retrieving total warehouses servicing each customer.");
                    PreparedStatement stmt = con.prepareStatement(query10());
                    ResultSet result = stmt.executeQuery();
                    getQuery10(result);
                }
                System.out.println("[1]Query1 [2]Query2 [3]Query7 [4]Query9 [5]Query10 [6]Exit Program");
                System.out.println("Select an Option: ");
                select = scan.nextInt();
            }
        System.out.println("Exited Program");
        con.close();
        } catch (SQLException e) {
            System.out.println(e.getMessage() + " Can't connect to database");
            while (e != null) {
                System.out.println("Message: " + e.getMessage());
                e = e.getNextException();
            }
        } catch (Exception e) {
            System.out.println("Other Error");
        }
    }
}