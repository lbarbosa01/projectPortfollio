import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {Button, Col, Form, Row} from "react-bootstrap";
import useFetch from "./useFetch";

function CustomerUpdate() {
    const {id} = useParams();
    const history = useHistory();
    let url = `http://localhost:8000/customers/${id}`;
    const [error, setError ] = useState(  null );
    const [ isPending, setIsPending] = useState(true);
    const [values, setValues] = useState( {
        id: id,
        name: '',
        email: '',
    });
    useEffect( () => {
        console.log("URL->" + url);
        const abortContr = new AbortController();
        fetch(url, {signal: abortContr.signal})
            .then(resp => {
                if (!resp.ok) {
                    throw Error("Cannot fetch URL data for resource")
                }
                return resp.json()
            }).then(data => {
            setIsPending(false);
            setValues({
                ...values,
                name: data.CustomerName,
                email: data.CustomerEmail,
            });
            console.log("data=>")
            console.log(data);
            setError(null);
        }).catch((err) => {
            if (err.name == 'AbortError') {
                console.log("Udata Fetch Aborted->")
                console.log(err.message);
            } else {
                console.log("Update Error:");
                console.log(err.message);
                setIsPending(false);
                setError(err.message);
            }
        })
    }, []);
    const updateCustomer = (e) => {
        e.preventDefault();
        console.log("Updated Customer: ");
        console.log(values);
        fetch(url, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
        }).then(() => {
            history.push('/customers');
        }).then(() => {
            alert("Update Successful!");
        }).catch((error) => {
            console.log(error);
        })
    };
    return (
        <div>
            {values && (
                <div>
                    <h2 className='offset-1' style={{fontSize: "230%", marginTop: "2%"}}>Update Customer
                        Information</h2>
                    <Form method='put' onSubmit={updateCustomer}>
                        <Form.Group className="mb-3 col-5 offset-1" controlId="formName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text"
                                          name='name'
                                          defaultValue={values.name}
                                          required
                                          onChange={ (e) => setValues({...values, name : e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 col-5 offset-1" controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="text"
                                          name='email'
                                          defaultValue={values.email}
                                          required
                                          onChange={ (e) => setValues({...values, email : e.target.value})}                            />
                        </Form.Group>
                        <Col className='offset-1' style={{display:'flex', justifyContent:'left'}}>
                            <Button variant="dark" type="submit">Submit</Button>
                        </Col>
                    </Form>
                </div>
            )}
        </div>
    );
}

export default CustomerUpdate;