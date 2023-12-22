import React from 'react';
import useFetch from "./useFetch";
import {Col, Row, Table} from "react-bootstrap";
import HomeList from "./lists/HomeList";

function Home(props) {
    const url = `http://localhost:8000/customers`;
    const { data : customers, isPending, error } = useFetch( url);
    const url2 = `http://localhost:8000/items`;
    const { data : items , isPending2, error2} = useFetch( url2);
    const url3 = `http://localhost:8000/stats`;
    const { data : sales, isPending3, error3} = useFetch( url3);
    return (
        <div style={{marginLeft: "7%"}}>
            { error3 && <div> Error: {error3} </div> }
            {isPending3 && <div> Loading ...</div>}
            { customers && items && sales && <HomeList
                customers={customers} items={items} sales={sales}/>}
        </div>
    );
}

export default Home;