import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

class StarWarsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
    };
  }

requestPlanets = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const data = await response.json();
  this.setState({
    planets: data.results,
  });
}

render() {
  const { Provider } = StarWarsContext;
  const { children } = this.props;
  return (
    <Provider
      value={ {
        ...this.state,
        requestPlanets: this.requestPlanets,
      } }
    >
      {children}
    </Provider>
  );
}
}
StarWarsProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export default StarWarsProvider;
