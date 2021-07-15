// import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [check, setCheck] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheck = async () => {
      try {
        setError(null);
        setCheck(null);
        setLoading(true);

        const res = await axios.get(
          'http://localhost:5000/api/login/2@12345'
        );

        setCheck(res.data);
      } catch(e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchCheck();
  }, []);

  if (loading) return <div className="App">Loading...</div>;
  if (error) return <div className="App">Error!</div>;
  if (check) {
    return <div className="App">Done!</div>
  } else {
    return <div className="App">False!</div>
  }
}

export default App;
