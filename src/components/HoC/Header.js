import React from 'react'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

const Header = ({ history }) => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        localStorage.removeItem('AuthToken');

        history.push('/login')
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Book Your Ticket</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            {userInfo ?
                                (<NavDropdown title={userInfo.firstName} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>)
                                :
                                (<LinkContainer to='/login'>
                                    <Nav.Link><i className='fas fa-user'></i> Sign In</Nav.Link>
                                </LinkContainer>)
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
