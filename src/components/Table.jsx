import React, { useEffect, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Table() {
  const { requestPlanets, planets, escreve,
    filterByName, filteredPlanets, valueFilter,
    clicaBotao, newPlanets, foiClicado } = useContext(StarWarsContext);
  useEffect(() => {
    requestPlanets();
  }, [requestPlanets]);
  const mapeiaArray = (param) => (param.map((planet) => (
    <tr key={ planet.name }>
      <td>{planet.name}</td>
      <td>{planet.rotation_period}</td>
      <td>{planet.orbital_period}</td>
      <td>{planet.diameter}</td>
      <td>{planet.climate}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.surface_water}</td>
      <td>{ planet.population }</td>
      <td>{planet.films}</td>
      <td>{planet.created}</td>
      <td>{planet.edited}</td>
      <td>{planet.url}</td>
    </tr>
  )));
  const criaTabela = () => {
    if (filterByName.length > 0) {
      return mapeiaArray(filteredPlanets);
    }
    if (foiClicado) {
      return mapeiaArray(newPlanets);
    }
    return mapeiaArray(planets);
  };
  return (
    <div>
      <input
        name="filterByName"
        type="text"
        data-testid="name-filter"
        onChange={ escreve }
        value={ filterByName }
        placeholder="pesquisar"
      />
      <select
        data-testid="column-filter"
        name="colunaFiltro"
        onChange={ escreve }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparaFiltro"
        onChange={ escreve }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        name="valueFilter"
        data-testid="value-filter"
        value={ valueFilter }
        onChange={ escreve }
      />
      <button
        type="button"
        data-testid="button-filter"
        name="buttonFilter"
        onClick={ clicaBotao }
      >
        Filtrar

      </button>
      <table>
        <tr>
          <th>name</th>
          <th>rotation period</th>
          <th>orbital period</th>
          <th>diamter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface water</th>
          <th>population</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>URL</th>

        </tr>
        {
          criaTabela()
        }
      </table>
    </div>
  );
}
