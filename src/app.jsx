import React from 'react';
import ReactDOM from 'react-dom';
import Attraction from './components/Attraction';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Attraction />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));