import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'

const LoginScreen = ({ location, history }) => {

    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')
    const [userInfo, setUserInfo] = useState('')

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true);
        const config = { headers: { 'Content-Type': 'application/json', }, }
        const { data } = await axios.post('http://localhost:9090/user/authenticate', { emailId, password }, config)
        if (data.status === "Error") {
            setLoading(false);
            setError(data.message);
        }
        else {
            setLoading(false);
            
            localStorage.setItem('userInfo', JSON.stringify(data.response));
            localStorage.setItem('AuthToken', data.response.token);

            history.push('/theatrelist')
        }
    }


    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {/* {loading && <Loader />} */}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='emailId'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='emailId'
                        placeholder='Enter email'
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
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

                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer?{' '}
                    <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
