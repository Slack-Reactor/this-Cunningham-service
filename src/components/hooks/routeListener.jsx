import React, { useState } from 'react';
import axios from 'axios';

const useRouteListener = (initialState) => {
  const [masterState, setMasterState] = useState(initialState);

  const handleIdClick = (id) => {
    window.history.pushState({}, '', `http://localhost:3001/id/${id}`);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  const handleUrlEvent = (service) => {
    const id = window.location.pathname.slice(4);
    if (service === 'showcase') {
      axios.get(`http://localhost:3001/api/showcase/${id}`)
        .then((data) => {
          setMasterState(data);
        })
        .catch((err) => console.log('Error GET by id:', err));
    }
  };

  return {
    masterState,
    handleIdClick,
    handleUrlEvent,
  };
};

export default useRouteListener;
