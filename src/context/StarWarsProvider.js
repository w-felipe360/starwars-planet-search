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
      filtrosAnteriores: [],
      clicouVezes: -1,
      options: [
        'population',
        'orbital_period',
        'diameter',
        'rotation_period',
        'surface_water'],
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

deleteOption = async () => {
  const { options, colunaFiltro } = this.state;
  const newFilters = await options.filter((filtro) => filtro !== colunaFiltro);
  this.setState({ options: newFilters }, () => this.setState({
    colunaFiltro: newFilters[0],
  }));
}

escreve = (event) => {
  this.setState({ [event.target.name]: event.target.value }, () => this.filterPlanet());
}

salvaValores = () => {
  const { valueFilter, colunaFiltro, comparaFiltro,
    newPlanets } = this.state;
  this.setState((prevState) => ({
    filtrosAnteriores: [...prevState.filtrosAnteriores, {
      valueFilter,
      colunaFiltro,
      comparaFiltro,
      newPlanets,
    }],
  }));
}

clicaBotao = () => {
  const { planets, valueFilter, colunaFiltro, comparaFiltro } = this.state;
  this.setState((prevState) => ({ clicouVezes: prevState.clicouVezes + 1 }));
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
  this.salvaValores();
  this.deleteOption();
}

filtrouBotao = () => {
  const { filtrosAnteriores, clicouVezes, colunaFiltro, comparaFiltro,
    valueFilter } = this.state;
  const arrayAnterior = filtrosAnteriores[clicouVezes];
  const { newPlanets } = arrayAnterior;
  const maiorQue = newPlanets.filter((planet) => (
    Number(planet[colunaFiltro]) > Number(valueFilter)));
  const menorQue = newPlanets.filter((planet) => (
    Number(planet[colunaFiltro]) < Number(valueFilter)));
  const igualA = newPlanets.filter((planet) => (
    Number(planet[colunaFiltro]) === Number(valueFilter)));
  switch (comparaFiltro) {
  case 'maior que':
    this.setState({
      newPlanets: maiorQue,
    }, () => this.salvaValores());
    break;
  case 'menor que':
    this.setState({
      newPlanets: menorQue,
    }, () => this.salvaValores());
    break;
  case 'igual a':
    this.setState({
      newPlanets: igualA,
    }, () => this.salvaValores());
    break;
  default:
    break;
  }
  this.setState({
    foiClicado: true,
  });
  this.deleteOption();
}

escreveAnterior = () => {
  const { clicouVezes } = this.state;
  if (clicouVezes > 0) { return this.filtrouBotao(); }
  return this.clicaBotao();
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
        escreveAnterior: this.escreveAnterior,
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
