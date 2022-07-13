import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Test from './components/test';
import TestTwo from './components/testtwo';
import DogPage from './components/DogPage';
import './stylesheet/fonts.css';

type RecordsProp = { dogName: string; startDate: string; endDate: string };

function App() {
  const [random, setRandom] = useState(5);
  const [isLoading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch('http://localhost:3001/record/');

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const recs = await response.json();
      setRecords(recs);
      setLoading(false);
    }

    getRecords();
  }, []);
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<HomePage isLoading={isLoading} records={records} />}
          />
          <Route
            path="/test"
            element={<Test isLoading={isLoading} records={records} />}
          />
          <Route
            path="/testtwo"
            element={<TestTwo isLoading={isLoading} records={records} />}
          />
          {records.map((x: RecordsProp) => (
            <Route
              key={x.dogName.replace(/\s/g, '')}
              path={`/${x.dogName.replace(/\s/g, '')}`}
              element={<DogPage dogName={x.dogName} />}
            />
          ))}

          <Route
            path={`/page${random}`}
            element={<DogPage dogName={`dogNum${random}`} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
