import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {

  const [color, setColor] = useState('gray');
  const [fontSize, setFontSize] = useState(14);

  return (
    <div style={{ padding: '10px', backgroundColor: color, fontSize: `${fontSize}px` }}>
      Hooks
      <button className='btn btn-dark' onClick={() => setColor('gray')}>Dark</button>
      <button className='btn btn-light' onClick={() => setColor('white')}>Light</button>
      <button className='btn' onClick={() => setFontSize((size) => size + 2)}>+</button>

    </div>
  )
}




root.render(
  <App />
);

