import {Navbar, Nav, Container, Row, Col} from "react-bootstrap";
import logo from "./logo.png";

function NavBar(props) {
    return (
        <div>
            <Navbar className="navbar-expand-lg" data-bs-theme="dark"
                    activekey="/" style={{backgroundColor: "#231F20"}}>
                <Nav>
                    <Row className='offset-1'>
                        <Col className='col-2'><img src={logo} className='logo'></img></Col>
                        <Col className='col-4'><div className='subTitle'>
                            <span style={{color: "#D4B474"}}>Harry's </span>
                           <span style={{color: "white"}}>Hardware</span> </div></Col>
                        <Col className='col-6' style={{marginTop: "2%"}}>
                            <Row>
                                <Col>
                                    <Nav.Item className='link'>
                                        <Nav.Link href='/'>Home</Nav.Link>
                                    </Nav.Item>
                                </Col>
                                <Col>
                                    <Nav.Item className='link'>
                                        <Nav.Link href='/customers'>Customers</Nav.Link>
                                    </Nav.Item>
                                </Col>
                                <Col>
                                    <Nav.Item className='link'>
                                        <Nav.Link href='/products'>Products</Nav.Link>
                                    </Nav.Item>
                                </Col>
                                <Col>
                                    <Nav.Item className='link'>
                                        <Nav.Link href='/sales'>Sales</Nav.Link>
                                    </Nav.Item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;