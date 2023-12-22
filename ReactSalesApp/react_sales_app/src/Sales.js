import React from 'react';
import useFetch from "./useFetch";
import {Col} from "react-bootstrap";
import SalesList from "./lists/SalesList";

function Sales(props) {
    const url = `http://localhost:8000/sales`;
    const { data : sales, isPending, error } = useFetch( url);
    return (
        <Col className='offset-3'>
            { error && <div> Error: {error} </div> }
            {isPending && <div> Loading ...</div>}
            { sales && <SalesList sales={sales}/>}
        </Col>
    );
}
export default Sales;