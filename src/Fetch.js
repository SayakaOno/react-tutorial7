import React from 'react';

class Fetch extends React.Component {
  state = {items: []};

  componentWillMount() {
    fetch ( 'https://ghibliapi.herokuapp.com/films')
      .then( response => response.json() )
      .then( result => this.setState({items: result}))
  }
  filter = e => {
    this.setState({filter: e.target.value});
  }

  render() {
    let items = this.state.items;
    if (this.state.filter) {
      items = items.filter( item => 
        item.title.toLowerCase().includes(this.state.filter.toLowerCase()));
    }
    return (
      <div>
        <hr />
        <h2>Studio Ghibli films</h2>
        <input
          type="text"
          onChange={e => this.filter(e)}
        />
        {items.map(item => <Movie key={item.id} movie={item.title} />)}
      </div>
    );
  }
}

const Movie = props => <p>{props.movie}</p>

export default Fetch;