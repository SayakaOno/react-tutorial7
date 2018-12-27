import React from 'react';
import ReactDOM from 'react-dom';

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
        <Title text={this.props.text}/>
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
      <>
        <input
            value={this.props.value}
            onChange={this.props.onChange}       
        />
      </>
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
    if (props[propName].length < 6) {
      return new Error(`${propName} was too short`);
    }
  }
}

class Wrapper extends React.Component {
  state = { increasing: false }

  mount = () => {
    ReactDOM.render(<App text="this is the title" />, document.getElementById('a'));
  }
  unmount = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('a'));
  }
  update = () => {
    ReactDOM.render(
      <Wrapper value={this.props.value+1} />,
      document.getElementById('root')
    );
  }
  componentWillReceiveProps(nextProps) {
    console.log('next', nextProps)
    console.log('current', this.props.value)
    this.setState({increasing: nextProps.value > this.props.value})
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.value % 5 === 0;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate', `prevProps: ${prevProps.value}`);
  }

  render() {  
    console.log(this.state.increasing)
    return (
      <div>
        <button onClick={this.update}>
          {this.props.value}
        </button><br />
        <button onClick={this.mount}>Mount</button>
        <button onClick={this.unmount}>UnMount</button>
        <div id="a"></div>
      </div>
    );
  }
}

Wrapper.defaultProps = {value: 0}

export default Wrapper;