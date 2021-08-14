import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Theatre = ({ theatreInfo }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/theatre/${theatreInfo.theatreId}`}>
                <Card.Img src={theatreInfo.logoUrl} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/theatre/${theatreInfo.theatreId}`}>
                    <Card.Title as='div'>
                        <strong>{theatreInfo.theatreName}</strong>
                    </Card.Title>
                </Link>

                <Card.Text>{theatreInfo.theatreLoc}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Theatre
