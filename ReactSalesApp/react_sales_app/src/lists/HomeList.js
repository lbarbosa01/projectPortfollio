import React from 'react';
import useFetch from "../useFetch";
import {Button, Col, Row, Table} from "react-bootstrap";
import TopCustomers from "./HomeLists/TopCustomers";
import TopProducts from "./HomeLists/TopProducts";
import TopSales from "./HomeLists/TopSales";

function HomeList({customers, items, sales}) {
    return (
        <div>
            <Row style={{marginTop: "2%", maxWidth: "100%"}}>
                <div className='col-4'>
                <Table striped bordered hover variant='dark'>
                    <thead>
                    <tr>
                        <th colSpan={3}>Top Customers</th>
                    </tr>
                    </thead>
                    <tbody>
                    <TopCustomers customers={customers}/>
                    </tbody>
                </Table>
                </div >
                <div className='col-4'>
                <Table striped bordered hover variant='dark'>
                    <thead>
                    <tr>
                        <th colSpan={3}> Top Products </th>
                    </tr>
                    </thead>
                    <tbody>
                    <TopProducts items={items}/>
                    </tbody>
                </Table>
        </div>
                <div className=' col-4'>
                <Table striped bordered hover variant='dark'>
                <thead>
                <tr>
                    <th colSpan={3}> Top Sales </th>
                </tr>
                </thead>
                <tbody>
                <TopSales sales={sales}/>
                </tbody>
            </Table>
                </div>
            </Row>
            <Row style={{maxWidth: "100%"}}>
                <Col className='col-4'><Button variant='dark' style={{marginLeft: "20%"}}
                                               href='/customers' >Show All</Button></Col>
                <Col className='col-4'><Button variant='dark' style={{marginLeft: "20%"}}
                                               href='/products' >Show All</Button></Col>
                <Col className='col-4'><Button variant='dark' style={{marginLeft: "20%"}}
                                               href='/sales' >Show All</Button></Col>
            </Row>
        </div>
    );
}

export default HomeList;