import React from 'react';

const HOC = InnerComponent => class extends React.Component {
  state = { count : 0 };

  componentDidMount = () => {
    console.log('componentDidMount from HOC');
  }
  update = () => {
    this.setState(prevState => { return { count: prevState.count+1 } });
  }
  
  render() {
    return (
      <InnerComponent
        {...this.props}
        {...this.state}
        update = {this.update}
      />
    );
  }
}

class Hoc extends React.Component {
  render() {
    return (
      <>
        <h2>HOC</h2>
        <Button>button</Button><br />
        <LabelHOC>label</LabelHOC>
      </>
    );
  }
}

const Button = HOC(props => {
  return (
    <button onClick={props.update}>{props.children} - {props.count}</button>
  );
});

class Label extends React.Component {
  componentDidMount = () => {
    console.log('componentDidMount from Label');
  }
  
  render() {
    return (
      <label onMouseMove={this.props.update}>
        {this.props.children} - {this.props.count}
      </label>
    );
  }
}

const LabelHOC = HOC(Label);

export default Hoc;