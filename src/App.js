import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  state = {
    a: '', b: '', c: '', d: '', val: 0,
  }

  a = React.createRef();
  c = React.createRef();
  d = React.createRef();
 
  onTextChange = () => {
    this.setState({
      a: this.a.current.value,
      b: this.b.value,
      c: this.c.current.value,
      d: this.d.current.value,
    });
  }

  update = () => {
    this.setState(prevState => {
      return { val: prevState.val + 1 }
    });
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
        <Button onClick={this.update}>
          {this.state.val} 
        </Button>
        <Title text={this.props.text}/>
        <input
          ref={this.a}
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
          ref={this.c}
          value={this.state.c}
          onChange={this.onTextChange}       
        />{this.state.c}
        <hr />
        <Input2
          ref={this.d}
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

const Title = props => <h2>{props.text}</h2>;

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

const Input = React.forwardRef((props, ref) => {
  return (
    <input
      ref={ref}
      value={props.value}
      onChange={props.onChange}       
    />
  );
});

const Input2 = React.forwardRef((props, ref) => {
  return (
    <div>
      <input
        ref={ref}
        value={props.value}
        onChange={props.onChange}       
      />
    </div>
  );
});

export default App;