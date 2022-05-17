import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import DogPage from './components/DogPage';

function PageB() {
  return (
    <div>
      {' '}
      <nav>
        <ul>
          <li>
            <Link to="/">To Home</Link>
          </li>
        </ul>
      </nav>
      <h1> SECOND Page B </h1>

    </div>
  );
}
function App() {
  const camelCase = 5;
  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pageB" element={<DogPage dogName="Frank" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;