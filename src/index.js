import React, { useCallback, useMemo, useEffect, useState } from 'react';
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

const getPlanet = (id) => {
  return fetch(`https://swapi.dev/api/planets/${id}`)
    .then((res) => res.json())
    .then(data => data)
}

const useRequest = (request) => {
  const initialState = useMemo(() => ({
    data: null,
    loading: true,
    error: null,
  }), []);

  const [dataState, setDataState] = useState(initialState);

  useEffect(() => {
    setDataState(initialState)

    let cancelled = false;
    request().then(data => !cancelled && setDataState({
      data,
      loading: false,
      error: false,
    })).catch((error) => !cancelled && setDataState({
      data: null,
      loading: false,
      error
    }));

    return () => cancelled = true;
  }, [request, initialState])

  return dataState;
}


const usePlanetInfo = (id) => {

  const request = useCallback(() => getPlanet(id), [id]);

  return useRequest(request);
}

const PlanetInfo = ({ id }) => {

  const { data, loading, error } = usePlanetInfo(id);

  if (error) return <div>Something is wrong</div>
  if (loading) return <div>Loading...</div>

  return (
    <div>
      {id} - {data && data.name}
    </div>
  )
}

root.render(
  <App />
);

