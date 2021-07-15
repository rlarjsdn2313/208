import React, { useEffect, useState } from 'react';
import axios from "axios";

function checkLogin(input) {
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchCheck = async () => {
        try {

            const res = await axios.get(
            'http://localhost:5000/api/login/' + input
            );

            setResult(res.data);
        } catch(e) {
            setError(e);
        }
        };
        fetchCheck();
    }, []);

    return result;
}

export default checkLogin;