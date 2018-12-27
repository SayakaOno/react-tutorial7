import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      a: '', b: '', c: '', d: '', 
    }
  }

  onTextChange = () => {
    this.setState({
      a: this.refs.a.value,
      b: this.b.value,
      c: ReactDOM.findDOMNode(this.c).value,
      d: this.d.refs.input.value,
    });
  }

  render() {
    return (
      <div>
        <input
          ref="a"
          value={this.state.a}
          onChange={this.onTextChange}       
        />{this.state.a}
        <hr />
        <input
          ref={ node  => this.b = node }
          value={this.state.b}
          onChange={this.onTextChange}       
        />{this.state.b}
        <hr />
        <Input
          ref={ component => this.c = component }
          value={this.state.c}
          onChange={this.onTextChange}       
        />{this.state.c}
        <hr />
        <Input2
          ref={ component => this.d = component }
          value={this.state.d}
          onChange={this.onTextChange}       
        />{this.state.d}
      </div>
    );
  }
}

class Input extends React.Component {
  render() {
    return (
      <input
          value={this.props.value}
          onChange={this.props.onChange}       
        />
    );
  }
}

class Input2 extends React.Component {
  render() {
    return (
      <div>
        <input
          ref="input"
          value={this.props.value}
          onChange={this.props.onChange}       
        />
      </div>
    );
  }
}

App.propTypes = {
  a: PropTypes.string,
  b: PropTypes.number
}

export default App;