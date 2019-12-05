import React from 'react';
import logo from './assets/logo.svg';
import reshuffle from './assets/reshuffle.png';
import plus from './assets/plus.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
      <div className="logos">
        <img src={logo} className="App-logo logo" alt="logo" />
        <img src={plus} className="logo-plus" alt="logo"/>
        <img src={reshuffle} className="logo-re" alt="logo" />
        </div>
        {/* <div className="App-section"> */}
        <p>
          Edit <code>src/App.js</code> and save to reload. <br/>
          Edit backend/backend.js to develop your backend code.
        </p>
        <a
          className="App-link"
          href="https://reshuffle.com"
          target="blank"
        >
          Learn Reshuffle
        </a>
      </div>
    </div>
  );
}

export default App;
