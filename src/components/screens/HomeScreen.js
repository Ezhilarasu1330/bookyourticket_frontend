import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const HomeScreen = ({ history }) => {

    useEffect(() => {
        console.log("User Effect Called ");

        const authToken = localStorage.getItem('AuthToken');
        // axios.defaults.headers.common = { Authorization: `${authToken}` };
        if (authToken) {

        }
        else {
            history.push('/login')
        }
    });

    return (
        <>
        </>
    )
}

export default HomeScreen