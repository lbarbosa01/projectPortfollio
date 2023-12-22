import './main.css';
import NavBar from './NavBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NotFound from './NotFound';
import React from 'react';
import Home from "./Home";
import Customers from "./Customers";
import Products from "./Products";
import Sales from "./Sales";
import CustomerUpdate from "./CustomerUpdate";
import AddCustomer from "./AddCustomer";
import AddProduct from "./AddProduct";

function App() {
    return (
        <Router>
        <div className="App">
            <NavBar/>
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route path="/customers"><Customers/></Route>
                    <Route path="/editInfo/:id"><CustomerUpdate /></Route>
                    <Route path="/addCustomer"><AddCustomer /></Route>
                    <Route path="/products"><Products/></Route>
                    <Route path="/addProduct"><AddProduct /></Route>
                    <Route path="/sales"><Sales/></Route>
                    <Route path="*"><NotFound/></Route>
                </Switch>
        </div>
        </Router>
    );
}

export default App;
