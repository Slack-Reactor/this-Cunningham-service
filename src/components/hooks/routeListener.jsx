import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
  id: 0,
};

const useRouteListener = (service) => {
  const [masterState, setMasterState] = useState(initialState);

  if (service === 'showcase') {
    axios.get()
  }

  return {
    masterState,

  };
};

export default useRouteListener;
