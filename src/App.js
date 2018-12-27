import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      a: '', b: '', c: '', d: '', val: 0,
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

  update = () => {
    this.setState(prevState => {
      return { val: prevState.val + 1 }
    });
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.setState({m: 2});
  }
  componentDidMount() {
    console.log('componentDidMount');
    this.inc = setInterval(this.update, 500);
  }
  componentWillUnmount() {
    console.log('componentWillMount');
    clearInterval(this.inc);
  }

  render() {
    console.log('rendering');
    return (
      <div>
        <Title text="TITLE"/>
        <Button onClick={this.update}>
          {this.state.val * this.state.m} 
        </Button>
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

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      style={{marginBottom: '20px', display: 'block'}}
    >
      {props.children}
    </button>
  );
}

const Title = props => <h1>{props.text}</h1>;

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

Title.propTypes = {
  text(props, propName, component) {
    if (!(propName in props)) {
      return new Error(`missing ${propName}`);
    }
    if (props[propName].length > 6) {
      return new Error(`${propName} was too short`);
    }
  }
}

class Wrapper extends React.Component {
  mount = () => {
    ReactDOM.render(<App />, document.getElementById('a'));
  }
  unmount = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('a'));
  }
  render() {
    return (
      <div>
        <button onClick={this.mount}>Mount</button>
        <button onClick={this.unmount}>UnMount</button>
        <div id="a"></div>
      </div>
    );
  }
}

export default Wrapper;