import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/Timeline';
import DogPage from './components/DogPage';
import './stylesheet/fonts.css';

type RecordsProp = { dogName: string; startDate: string; endDate: string };

function App() {
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
      setRecords(
        recs.sort(
          // eslint-disable-next-line no-confusing-arrow
          (a: any, b: any) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            Date.parse(a.startDate) > Date.parse(b.startDate) ? 1 : -1
          // eslint-disable-next-line function-paren-newline
        )
      );
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
          {records.map((x: RecordsProp) => (
            <Route
              key={x.dogName.replace(/\s/g, '')}
              path={`/${x.dogName.replace(/\s/g, '')}`}
              element={<DogPage dogName={x.dogName} />}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
