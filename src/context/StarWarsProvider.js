import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

class StarWarsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      filterByName: '',
      filteredPlanets: [],
    };
  }

requestPlanets = async () => {
  const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
  const data = await response.json();
  this.setState({
    planets: data.results.filter((planetas) => delete planetas.residents),
  });
}

filterPlanet = () => {
  const { planets, filterByName } = this.state;
  const planetFiltered = planets.filter((planet) => planet.name.includes(filterByName));
  this.setState({
    filteredPlanets: planetFiltered,
  });
}

escreve = (event) => {
  this.setState({ [event.target.name]: event.target.value }, () => this.filterPlanet());
}

render() {
  const { Provider } = StarWarsContext;
  const { children } = this.props;
  return (
    <Provider
      value={ {
        ...this.state,
        requestPlanets: this.requestPlanets,
        filterPlanet: this.filterPlanet,
        escreve: this.escreve,
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
