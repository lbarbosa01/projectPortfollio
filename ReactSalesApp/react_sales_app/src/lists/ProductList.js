import React from 'react';
import {Button, Table} from "react-bootstrap";

function ProductList({items}) {
    return (
        <div>
            <Table striped bordered hover variant='dark' style={{marginTop: "1%"}}>
                <thead>
                <tr>
                    <th> Product</th>
                    <th> Total Sales</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                        <tr key={item.ItemName}>
                            <td> {item.ItemName}</td>
                            <td> ${item.TotalSales}</td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>
            <div><Button variant='warning' href='/addProduct'>
                Insert New Product</Button></div>
        </div>
    )
}

export default ProductList;