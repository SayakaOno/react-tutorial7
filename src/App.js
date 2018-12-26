import React from 'react';
import PropTypes from 'prop-types';

class App extends React.Component {
  render() {
    let text = this.props.text;
    return <h1>{text}</h1>;
  }
}

App.propTypes = {
  text: PropTypes.number,
  cat: PropTypes.number
}

export default App;