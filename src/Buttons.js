import React from 'react';

class Buttons extends React.Component {
  state = { selected: 'None' };

  selectItem = selected => {
    this.setState({selected});
  };

  render() {
    let fn = child =>
      React.cloneElement(child, {
        onClick: () => this.selectItem(child.props.value)
      });
    let items = React.Children.map(this.props.children, fn);
    return (
      <div>
        <h2>Work with Children</h2>
        <p>You have selected: {this.state.selected}</p>
        {items}
      </div>
    );
  }
}

export default Buttons;