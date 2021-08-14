import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Loader from '../Loader'
import Message from '../Message'

const TheatreInfo = ({ history, match }) => {

    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')
    const [data, setData] = useState({ screenInfoList: [], theatreName: '' });

    let token = localStorage.getItem('AuthToken');
    useEffect(async () => {
        const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
        const { data } = await axios.get(`http://localhost:9090/theatre/${match.params.id}/shows`, config);
        if (data.code == 200) {
            setData({ screenInfoList: data.response.screenInfoList, theatreName: data.response.theatreName });
        }
        else
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
                        <h1>{data.theatreName}</h1>
                        {data.screenInfoList.map((screenInfo) => (
                            <Row>

                                <h4>{screenInfo.screenName}</h4>

                                {/* <Col key={theatreInfo.theatreId} sm={12} md={6} lg={4} xl={3}>
                                    <Theatre theatreInfo={theatreInfo} />
                                </Col> */}

                            </Row>
                        ))}
                    </>)
            }
        </>
    )
}

export default TheatreInfo
