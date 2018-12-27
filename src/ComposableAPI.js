import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class ComposableAPI extends React.Component {
  state = {red: 0, blue: 0}

  update = (ref) => {
    this.setState(() => {
      return {[ref]: ReactDOM.findDOMNode(this.refs[ref].refs.input).value};
    });
  }
  render() {
    return (
      <div>
        <h2>ComposableAPI</h2>
        <NumInput
          ref="red"
          min={0}
          max={255}
          step={1}
          value={+this.state.red}
          label="Red"
          update={() => this.update("red")}
        />
        <NumInput
          ref="blue"
          type="number"
          min={0}
          max={255}
          step={10}
          value={+this.state.blue}
          label="Blue"
          update={() => this.update("blue")}
        />
      </div>
    )
  }
}

class NumInput extends React.Component {
  render() {
    let label = this.props.label !== '' ?
      <label>{this.props.label} - {this.props.value}</label> : '';

    return (
      <div>
        <input
          ref="input"
          type={this.props.type}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          defaultValue={this.props.val}
          onChange={this.props.update}
        /><br />
          {label}
      </div>
    );
  }
}

NumInput.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  val: PropTypes.number,
  label: PropTypes.string,
  update: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['number', 'range']),
}

NumInput.defaultProps = {
  min: 0,
  max: 0,
  step: 1,
  val: 0,
  label: '',
  type: 'range'
}

export default ComposableAPI;