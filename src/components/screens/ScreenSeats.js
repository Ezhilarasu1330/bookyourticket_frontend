import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'
import Loader from '../Loader'
import Message from '../Message'
import moment from 'moment'

const ScreenSeats = ({ history, match }) => {

    console.log('Params : ', match.params);

    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')
    const [data, setData] = useState({ screenSeatInfo: [], theatreName: '', movieName: '', showStartTime: '' });

    let token = localStorage.getItem('AuthToken');
    useEffect(async () => {
        const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
        const { data } = await axios.get(`http://localhost:9090/show/${match.params.screenId}/seats`, config);
        if (data.code == 200) {
            setData({
                screenSeatInfo: data.response.screenSeatInfo,
                theatreName: data.response.theatreName,
                movieName: data.response.movieName,
                showStartTime: data.response.showStartTime
            });
        }
        else {
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
                        <h1>{data.theatreName}</h1>
                        <Row>
                            <Col md={6} className='my-3'>
                                <h5>{data.movieName}</h5>
                            </Col>
                            <Col md={6} className='my-3'>
                                <h5> Show Time : {moment(data.showStartTime).format("HH:mm a")}</h5>
                            </Col>
                        </Row>


                        <ul className="showcase">
                            <li>
                                <div id="seat" className="seat" />
                                <small className="status" style={{ fontSize: '1em' }}>N/A</small>
                            </li>
                            <li>
                                <div id="seat" className="seat selected" />
                                <small className="status" style={{ fontSize: '1em' }}>Selected</small>
                            </li>
                            <li>
                                <div id="seat" className="seat occupied" />
                                <small className="status" style={{ fontSize: '1em' }}>Occupied</small>
                            </li>
                        </ul>


                        <Row>

                            <div class="container">
                                <div class="screen"></div>
                                <div class="row">
                                </div>
                            </div>

                            {data.screenSeatInfo ? data.screenSeatInfo.map((seatInfo) => (
                                <Card className='my-3 p-3 rounded'>
                                    <Card.Title as='div'>
                                        <strong>{seatInfo.seatNumber}</strong>
                                    </Card.Title>
                                </Card>
                                // <Card.Title as='div'>
                                //     <strong>{seatInfo.seatNumber}</strong>
                                // </Card.Title>
                            )) : <h1>No Seats available</h1>}
                        </Row>
                    </>)
            }
        </>
    )
}

export default ScreenSeats
