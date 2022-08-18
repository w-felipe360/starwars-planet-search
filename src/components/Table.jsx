import React, { useEffect, useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Table() {
  const { requestPlanets, planets, escreve,
    filterByName, filteredPlanets } = useContext(StarWarsContext);
  useEffect(() => {
    requestPlanets();
  }, [requestPlanets]);
  return (
    <div>
      <input
        name="filterByName"
        type="text"
        data-testid="name-filter"
        onChange={ escreve }
        value={ filterByName }
      />
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
          filterByName.length > 0 ? filteredPlanets.map((planet) => (
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
          ))

            : planets.map((planet) => (
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
            ))
        }
      </table>
    </div>
  );
}
