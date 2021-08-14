import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Loader from '../Loader'
import Message from '../Message'
import Theatre from '../../components/Theatre'

const TheatreList = ({ match }) => {
    // Notification
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [theatreList, setTheatreList] = useState({ theatreList: [] });

    let token = localStorage.getItem('AuthToken');
    useEffect(async () => {
        const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
        const { data } = await axios.get('http://localhost:9090/theatre/list', config);
        if (data.code == 200) {
            setTheatreList({ theatreList: data.response.theatres });
        }else
        {
            setError(data.message);
        }
    }, []);

    return (
        <>
            {loading ?
                (<Loader />)
                : error ?
                    (<Message variant='danger'>{error}</Message>)
                    :
                    (<>
                        <h1>List of theatres</h1>
                        <Row>
                            {theatreList.theatreList.map((theatreInfo) => (
                                <Col key={theatreInfo.theatreId} sm={12} md={6} lg={4} xl={3}>
                                    <Theatre theatreInfo={theatreInfo} />
                                </Col>
                            ))}
                        </Row>
                    </>)
            }
        </>
    )
}

export default TheatreList
