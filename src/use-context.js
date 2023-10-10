import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const MyContext = React.createContext();

const Child = () => {
  const value = useContext(MyContext);

  return <p>{value}</p>;
}

const App = () => {

  return (
    <MyContext.Provider value='Some context'>
      <Child />
    </MyContext.Provider>

  )
}




root.render(
  <App />
);

