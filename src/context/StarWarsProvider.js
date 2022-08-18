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
      valueFilter: 0,
      colunaFiltro: 'population',
      comparaFiltro: 'maior que',
      newPlanets: [],
      foiClicado: false,
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

clicaBotao = () => {
  const { planets, valueFilter, colunaFiltro, comparaFiltro } = this.state;
  const maiorQue = planets.filter((planet) => (
    Number(planet[colunaFiltro]) > Number(valueFilter)));
  const menorQue = planets.filter((planet) => (
    Number(planet[colunaFiltro]) < Number(valueFilter)));
  const igualA = planets.filter((planet) => (
    Number(planet[colunaFiltro]) === Number(valueFilter)));
  switch (comparaFiltro) {
  case 'maior que':
    this.setState({
      newPlanets: maiorQue,
    });
    break;
  case 'menor que':
    this.setState({
      newPlanets: menorQue,
    });
    break;
  case 'igual a':
    this.setState({
      newPlanets: igualA,
    });
    break;
  default:
    break;
  }
  this.setState({
    foiClicado: true,
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
        filterPlanet: this.filterPlanet,
        escreve: this.escreve,
        clicaBotao: this.clicaBotao,
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
