import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useCookies } from 'react-cookie';


function Login(setCheck) {
    const [cookeis, setCookie, removeCookie] = useCookies(['input']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    function changeValue(e) {
        e.preventDefault();
        setCookie('input', e.target.value);
        
    }

    return (
        <div className="Login">
            <input placeholder="id@password" onChange={changeValue}></input>
        </div>
    )
}

export default Login;