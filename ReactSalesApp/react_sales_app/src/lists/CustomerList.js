import React, {useEffect} from 'react';
import {Button, Table} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import useFetch from "../useFetch";

function CustomerList({customers}) {
    const history = useHistory();
    const handleClick = (id) => {
            let URL = `http://localhost:8000/customers/${id}`;
            console.log(URL);
            fetch(URL, {
                method: 'DELETE',
                headers: {"Content-Type": "application/json"},
            }).then(() => {
                window.location.reload();
            }).then(() => {
                alert("Delete Successful!");
            }).catch((error) => {
                console.error(error);
            });
    };
    return (
        <div>
            <Table striped bordered hover variant='dark' style={{marginTop: "1%"}}>
                <thead>
                <tr>
                    <th> Name</th>
                    <th> Email</th>
                    <th> Update</th>
                    <th> Delete</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                        <tr key={customer.CustomerID}>
                            <td> {customer.CustomerName}</td>
                            <td> {customer.CustomerEmail}</td>
                            <td>
                                <form method='get' action={(`/editInfo/${customer.CustomerID}`)}>
                                    <Button variant='info' type='submit'>Update</Button>
                                </form>
                            </td>
                            <td>
                                <form>
                                    <Button method='delete' onClick={() =>
                                        handleClick(customer.CustomerID)} variant="danger">Delete</Button>
                                </form></td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>
            <div><Button variant='warning' href='/addCustomer'>
                Insert New Customer</Button></div>
            </div>
    );
}

export default CustomerList;