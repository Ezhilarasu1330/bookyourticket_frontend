import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'

import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'

const RegisterScreen = ({ location, history }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [message, setMessage] = useState(null)

    const submitHandler = (e) => {
        e.preventDefault();

        const config = { headers: { 'Content-Type': 'application/json' } }
        const { data } = axios.post('/api/users', { firstName, lastName, emailId, password, phoneNumber }, config)
        console.log(" Create User Res : ", data);
        //  Registraction Request
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {/* {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />} */}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='firstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type='firstName'
                        placeholder='Enter First name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='lastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type='lastName'
                        placeholder='Enter Last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='emailId'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='emailId'
                        placeholder='Enter email'
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='phoneNumber'>
                    <Form.Label>Email Phone Numer</Form.Label>
                    <Form.Control
                        type='phoneNumber'
                        placeholder='Enter Phone Number'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Register</Button>
            </Form>

            <Row className='py-3'>
                <Col>Have an Account?{' '}
                    <Link to='/login'>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen