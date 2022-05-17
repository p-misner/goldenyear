import React from 'react';
import { Link } from 'react-router-dom';

interface DogProps {
    dogName: string;
}

function DogPage(props: DogProps) {
  const { dogName } = props;
  return (
    <div>
      {' '}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
      <h1>
        {dogName}

      </h1>

    </div>
  );
}

export default DogPage;
