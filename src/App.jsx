import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [advice, setAdvice] = useState({
    advice: "",
    isFetching: false,
  });


  // Fetch English advice
  const fetchAdvice = () => {
    setAdvice((prevState) => ({ ...prevState, isFetching: true }));
    axios
      .get("https://api.adviceslip.com/advice")
      .then((res) => {
        const { advice } = res.data.slip;
        setAdvice({ advice: advice, isFetching: false });
      })
      .catch((error) => {
        console.log("Error occurred", error);
        setAdvice((prevState) => ({ ...prevState, isFetching: false }));
      });
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  const rawAdvice = advice.advice.slice(0, -1);

  return (
    <div className="app">
      {/* English Advice Card */}
      <div className={`card ${advice.isFetching ? "fetching" : ""}`}>
        <h1 className="heading">
          <span>' </span>{rawAdvice}<span> '</span>
        </h1>
        <button onClick={fetchAdvice} className="button">
          <span>Generate Advice</span>
        </button>
      </div>
    </div>
  );
};

export default App;
