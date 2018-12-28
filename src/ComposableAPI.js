import React from 'react';
import PropTypes from 'prop-types';

class ComposableAPI extends React.Component {
  state = {red: 0, blue: 0}

  red = React.createRef();
  blue = React.createRef();

  update = (e, ref) => {
    let value = e.target.value;
    this.setState(() => {
      return {[ref.current.props.label.toLowerCase()]: value}
    });
  }
  render() {
    return (
      <div>
        <h2>ComposableAPI</h2>
        <NumInput
          ref={this.red}
          min={0}
          max={255}
          step={1}
          value={+this.state.red}
          label="Red"
          update={(e) => this.update(e, this.red)}
        />
        <NumInput
          ref={this.blue}
          type="number"
          min={0}
          max={255}
          step={10}
          value={+this.state.blue}
          label="Blue"
          update={(e) => this.update(e, this.blue)}
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