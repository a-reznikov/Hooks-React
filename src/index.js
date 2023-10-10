import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const [value, setValue] = useState(3);
  const [visible, setVisible] = useState(true);

  if (visible) {
    return (
      <div>
        <button className='btn btn-success' onClick={() => setValue((value) => value + 1)}>
          +
        </button>
        <button className='btn btn-danger' onClick={() => setVisible((false))}>
          hidden
        </button>

        <PlanetInfo id={value} />
      </div>
    );
  } else {
    return <button className='btn btn-info' onClick={() => setVisible(true)}>show</button>
  }

}

const PlanetInfo = ({ id }) => {

  const [namePlanet, setNamePlanet] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://swapi.dev/api/planets/${id}`)
      .then((res) => res.json())
      .then(data => !cancelled && setNamePlanet(data.name))

    return () => cancelled = true;
  }, [id])

  const content = namePlanet ? `${id} - ${namePlanet}` : null;

  return (
    <div>
      {content}
    </div>
  )
}

root.render(
  <App />
);

