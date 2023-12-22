import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Col, Form} from "react-bootstrap";

function AddProduct(props) {
    const [item, setItem] = useState("");
    const [price, setPrice] = useState(0);
    const [ isPending, setIsPending ] = useState(false);
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {  item, price}
        console.log( `Product=`); console.log( product );
        setIsPending( true );
        let URL = "http://localhost:8000/items";
        fetch( URL , {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(product)
        }).then(() => {
            setIsPending( false );
            history.push('/products');
        }).then(() => {
            alert("Insert Successful!");
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div>
            <h2 className='offset-1' style={{fontSize: "230%", marginTop: "2%"}}>Add Products</h2>
            <Form method='put' onSubmit={handleSubmit}>
                <Form.Group className="mb-3 col-5 offset-1" controlId="formItem">
                    <Form.Label>Item:</Form.Label>
                    <Form.Control type="text"
                                  name='item'
                                  required
                                  onChange={ (e) => setItem(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3 col-5 offset-1" controlId="formProduct">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type="number"
                                  name='price'
                                  required
                                  onChange={ (e) => setPrice(e.target.valueAsNumber)}
                    />
                </Form.Group>
                <Col className='offset-1' style={{display:'flex', justifyContent:'left'}}>
                    <Button variant="dark" type="submit">Submit</Button>
                </Col>
            </Form>
        </div>
    );
}

export default AddProduct;