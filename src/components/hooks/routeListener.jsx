/* eslint-disable no-console */
/* eslint-disable consistent-return */
import axios from 'axios';

const useRouteListener = () => {
  const handleIdClick = (id) => {
    window.history.pushState({}, '', `http://localhost:3001/id/${id}`);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  const handleUrlEvent = (service) => {
    const id = window.location.pathname.slice(4);
    if (service === 'showcase') {
      return axios.get(`http://localhost:3001/api/showcase/${id}`)
        .then(({ data }) => {
          window.history.pushState({}, '', 'http://localhost:3001');
          return data;
        })
        .catch((err) => console.log('Error GET by id:', err));
    }
  };

  return {
    handleIdClick,
    handleUrlEvent,
  };
};

export default useRouteListener;
