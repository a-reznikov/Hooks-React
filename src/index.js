import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const [value, setValue] = useState(0);
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
        <ClassCounter value={value} />
        <HookCounter value={value} />
        <Notification />
      </div>
    );
  } else {
    return <button className='btn btn-info' onClick={() => setVisible(true)}>show</button>
  }

}

const HookCounter = ({ value }) => {

  //? All changes
  // useEffect(() => {
  //   console.log('useEffect');
  // }) 

  //? Only create component
  // useEffect(() => {
  //   console.log('useEffect');
  // }, [])

  //? Change specific variables
  // useEffect(() => {
  //   console.log('useEffect');

  //   return () => console.log('clean');
  // }, [value])

  //? Comparing with life cycle methods
  useEffect(() => console.log('mount'), [])
  useEffect(() => console.log('update'))
  useEffect(() => () => console.log('unmount'), [])

  return <p>{value}</p>
}

const Notification = () => {

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 2500);

    return () => clearTimeout(timeout);
  }, [])

  return (
    <div>
      {visible && <p>Hello</p>}
    </div>);
}

class ClassCounter extends Component {

  componentDidMount() {
    console.log('class: Mount');
  }

  componentDidUpdate() {
    console.log('class: Update');
  }

  componentWillUnmount() {
    console.log('class: Unmount');
  }

  render() {
    return null;
  }
}

root.render(
  <App />
);

