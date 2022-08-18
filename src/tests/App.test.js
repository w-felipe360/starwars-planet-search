import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import Table from '../components/Table';
import userEvent from '@testing-library/user-event'
import App from '../App';



  it('teste se ao entrar na página aparece um input de pesquisa', () => {
    renderWithContext(<Table />);
  const linkElement = screen.getByPlaceholderText(/pesquisar/i);
  expect(linkElement).toBeInTheDocument();
  });
  test('se as informações dos planetas são exibidas assim que a API é carregada.', async () => {
  await renderWithContext(<App />);
  const planetOne = await screen.findByText(/tato/i);
  await expect(planetOne).toBeInTheDocument();
})  

test('se ao digitar no input, os planetas digitados são exibidos', async () => {
  await renderWithContext(<App />);
  const planetOne = await screen.findByText(/tato/i);
 await expect(planetOne).toBeInTheDocument();
  const linkElement = await screen.getByPlaceholderText(/pesquisar/i);
  userEvent.type(linkElement, 'Tat')
  const tatu = await screen.findByRole('cell', {
    name: /tatooine/i
  })
 expect(tatu).toBeInTheDocument();
  })
  test('se o filtro de planetas está funcionando corretamente', async () => {
    await renderWithContext(<App />);
    const filtro = screen.getByRole('button', {
      name: /filtrar/i
    })
    const hoth = await screen.findByRole('cell', {
      name: /Hoth/i
    })
    userEvent.click(filtro);
  expect(hoth).not.toBeInTheDocument();
  })
