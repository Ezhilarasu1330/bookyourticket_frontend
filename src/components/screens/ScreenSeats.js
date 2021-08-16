import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import axios from 'axios'
import Loader from '../Loader'
import Message from '../Message'
import Notification from '../Notification'
import moment from 'moment'

const ScreenSeats = ({ history, match }) => {

    console.log('Params : ', match.params);

    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')
    const [ticketCount, setTicketCount] = useState(0)
    const [selectedSeat, setSelectedSeat] = useState([])
    const [price, setPrice] = useState(0)
    // Notification
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
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


    const selectSeatHandler = (event) => {

        // if (event.target.classList.contains('selected')) {
        //     console.log(event.target.className.replace("selected", "").trim())
        // }

        const selectedSeatId = event.target.id.split("seat_").pop();
        var seats = document.getElementsByClassName("selected");
        if (seats.length == 7) {
            setNotify({
                isOpen: true, message: 'You can able to select only 6 seats', type: 'error'
            })
        }
        else {

            setSelectedSeat(selectedSeat => [...selectedSeat, parseInt(selectedSeatId)]);
            setTicketCount(seats.length)
            setPrice(seats.length * 120)
            if (!event.target.classList.contains('occupied') && !event.target.classList.contains('selected')) {
                event.target.classList.add("selected");
            }
        }
    }

    const bookTicketCartHandler = async () => {

        if (ticketCount > 0) {
            const reqdata = {
                showId: match.params.screenId,
                selectedSeat: selectedSeat
            }
            const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
            const { data } = await axios.post(`http://localhost:9090/show/${match.params.screenId}/book`, reqdata, config);
        }
        else {
            setNotify({
                isOpen: true, message: 'Select atleast one ticket to proceed booking', type: 'error'
            })
        }

    }

    return (
        <>
            {loading ?
                (<Loader />)
                : error ?
                    (<Message variant='danger'>{error}</Message>)
                    :
                    (<>

                        <Row>
                            <Col md={9}>
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

                                <br></br>
                                <br></br>
                                <br></br>

                                <div style={{ perspective: '1000px' }}>
                                    <div className="screen"></div>
                                </div>

                                <Row>
                                    {data.screenSeatInfo ? data.screenSeatInfo.map((seatInfo) => (
                                        <div
                                            id={"seat_" + seatInfo.screenSeatId}
                                            key={seatInfo.screenSeatId}
                                            className={"seat " + (seatInfo.booked ? 'occupied' : '')}
                                            onClick={(e) => selectSeatHandler(e)}>
                                        </div>
                                    )) : <h1></h1>}
                                </Row>
                            </Col>

                            <Col md={3}>
                                <div className="priceInfo">
                                    <Card>
                                        <ListGroup variant='flush'>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>No of seats selected :</Col>
                                                    <Col>
                                                        {ticketCount}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price:</Col>
                                                    <Col>
                                                        {price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Button
                                                    onClick={bookTicketCartHandler}
                                                    className='btn-block'
                                                    type='button'
                                                    disabled={ticketCount === 0 || ticketCount > 6}
                                                >Book Tickets</Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </div>

                            </Col>
                        </Row>
                    </>)
            }

            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}

export default ScreenSeats
