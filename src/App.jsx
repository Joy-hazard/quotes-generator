import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const App = () => {
  const [advice, setAdvice] = useState({
    advice: "",
    isFetching: false,
  });
  const [quoteCount, setQuoteCount] = useState(0); // New state to track quote count

  // Fetch English advice
  const fetchAdvice = () => {
    setAdvice((prevState) => ({ ...prevState, isFetching: true }));
    axios
      .get("https://api.adviceslip.com/advice")
      .then((res) => {
        const { advice } = res.data.slip;
        setAdvice({ advice: advice, isFetching: false });
        setQuoteCount((prevCount) => prevCount + 1); // Increment quote count
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
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/">Quotes Generator</Navbar.Brand>
        </Container>
      </Navbar>
      <div className="app">
        {/* English Advice Card */}
        <div className={`card ${advice.isFetching ? "fetching" : ""}`}>
          <h1 className="heading">
            <span>' </span>{rawAdvice}<span> '</span>
          </h1>
          <button onClick={fetchAdvice} className="button">
            <span>Generate Advice</span>
          </button>
          <p className="quote-count">Quotes Generated: {quoteCount}</p> {/* Display the quote count */}
        </div>
      </div>
    </>
  );
};

export default App;
