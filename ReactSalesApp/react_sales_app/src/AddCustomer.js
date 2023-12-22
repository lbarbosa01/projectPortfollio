import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Col, Form} from "react-bootstrap";

function AddCustomer(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [ isPending, setIsPending ] = useState(false);
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        const customer = {  name, email};
        console.log( `customer=`); console.log( customer );
        setIsPending( true );
        let URL = "http://localhost:8000/customers";
        fetch( URL , {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(customer)
        }).then(() => {
            setIsPending( false );
            history.push('/customers');
        }).then(() => {
            alert("Insert Successful!");
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div>
            <h2 className='offset-1' style={{fontSize: "230%", marginTop: "2%"}}>Add Customer</h2>
            <Form method='put' onSubmit={handleSubmit}>
                <Form.Group className="mb-3 col-5 offset-1" controlId="formName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text"
                                  name='name'
                                  required
                                  onChange={ (e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3 col-5 offset-1" controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="text"
                                  name='email'
                                  required
                                  onChange={ (e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Col className='offset-1' style={{display:'flex', justifyContent:'left'}}>
                    <Button variant="dark" type="submit">Submit</Button>
                </Col>
            </Form>
        </div>
    );
}

export default AddCustomer;