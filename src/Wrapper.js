import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Fetch from './Fetch';
import Hoc from './Hoc';
import Buttons from './Buttons';
import ComposableAPI from './ComposableAPI';

class Wrapper extends React.Component {
  state = { increasing: false }

  mount = () => {
    ReactDOM.render(<App text={"Refs & Validation"} />, document.getElementById('a'));
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
        <h2>Advanced Lifecycle button</h2>
        <button onClick={this.update}>
          {this.props.value}
        </button><br />
        <h2>Basic Lifecycle button</h2>
        <button onClick={this.mount}>Mount</button>
        <button onClick={this.unmount}>UnMount</button>
        <div id="a"></div>
        <Hoc />
        <Buttons>
          <button value="A">A</button>
          <button value="B">B</button>
          <button value="C">C</button>
        </Buttons>
        <ComposableAPI />
        <Fetch />
      </div>
    );
  }
}

Wrapper.defaultProps = {value: 0}

export default Wrapper;