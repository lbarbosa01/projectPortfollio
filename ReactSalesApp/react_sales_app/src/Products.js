import React from 'react';
import useFetch from "./useFetch";
import {Col} from "react-bootstrap";
import ProductList from "./lists/ProductList";

function Products(props) {
    const url = `http://localhost:8000/items`;
    const { data : items, isPending, error } = useFetch( url);
    return (
        <Col className='offset-3'>
            { error && <div> Error: {error} </div> }
            {isPending && <div> Loading ...</div>}
            { items && <ProductList items={items}/>}
        </Col>
    );
}

export default Products;