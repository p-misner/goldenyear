import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      {' '}
      <nav>
        <ul>
          <li>
            <Link to="/pageB">To Page B</Link>
          </li>
        </ul>
      </nav>
      <h1> Home Page bby </h1>

    </div>
  );
}

export default HomePage;
