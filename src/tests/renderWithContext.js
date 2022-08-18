import React from 'react'
import { render, } from '@testing-library/react'
import StarWarsContext from '../context/StarWarsContext'
import StarWarsProvider from '../context/StarWarsProvider'

const renderWithContext = (component) => {
  return {
    ...render(
        <StarWarsProvider value={ StarWarsContext }>
            {component}
        </StarWarsProvider>)
  }
}
export default renderWithContext;
