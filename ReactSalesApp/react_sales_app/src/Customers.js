import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import useFetch from "./useFetch";
import {Col, Row} from "react-bootstrap";
import CustomerList from "./lists/CustomerList";

function Customers(props) {
    const url = `http://localhost:8000/customers`;
    const { data : customers, isPending, error } = useFetch(url);
    return (
            <Col className='offset-3'>
                { error && <div> Error: {error} </div> }
                {isPending && <div> Loading ...</div>}
                {customers && <CustomerList customers={customers}/>}
            </Col>
    );
}

export default Customers;