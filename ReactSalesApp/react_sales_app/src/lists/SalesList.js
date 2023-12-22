import React from 'react';
import {Button, Table} from "react-bootstrap";

function SalesList({sales}) {
    return (
        <div>
            <Table striped bordered hover variant='dark' style={{marginTop: "1%"}}>
                <thead>
                <tr>
                    <th> Date</th>
                    <th> Customer</th>
                    <th> Product</th>
                    <th> Quantity</th>
                    <th> Sales</th>
                </tr>
                </thead>
                <tbody>
                {sales.map((sale) => (
                        <tr key={sale.id}>
                            <td> {sale.Date}</td>
                            <td> {sale.CustomerName}</td>
                            <td> {sale.Product}</td>
                            <td> {sale.Quantity}</td>
                            <td> ${sale.TotalSales}</td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>
        </div>
    );
}

export default SalesList;