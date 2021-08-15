import React from 'react'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'

const ScreenAndShows = ({ screenInfo, theatreId }) => {

    return (
        <Card className='my-3 p-3 rounded'>
            <Row className='my-3'>
                <Col key={screenInfo.screenId} md={6}>
                    <h4><strong>{screenInfo.screenName}</strong></h4>
                </Col>
            </Row>
            {screenInfo.showInfo.map((showInfoVo) => (
                <Row key={showInfoVo.showId}>
                    <Col md={6} className='my-3'>
                        <h5>{showInfoVo.movieName}</h5>
                    </Col>

                    <Col md={6} className='my-3'>
                        <Link className='my-3' to={`/theatres/${theatreId}/show/${showInfoVo.showId}`}>
                            <Button type='button' className='btn-block'>
                                {moment(showInfoVo.showStartTime).format("HH:mm a")}
                            </Button>
                        </Link>
                    </Col>

                </Row>
            ))}
        </Card >
    )
}

export default ScreenAndShows
