import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axiosMock from 'axios';
import '@testing-library/jest-dom';
import PokemonPage from '../src/PokemonPage';

jest.mock('axios');

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

const pokemonList = {
  id: 133,
  abilities: [
    { ability: { name: 'anticipation', url: 'https://pokeapi.co/api/v2/ability/107/' }, is_hidden: true, slot: 3 },
    { ability: { name: 'adaptability', url: 'https://pokeapi.co/api/v2/ability/91/' }, is_hidden: false, slot: 2 }
  ],
  name: 'eevee',
  stats: [
    { base_stat: 55, effort: 0, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
    { base_stat: 65, effort: 0, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } } // Muutettu arvo
  ],
  types: [{ slot: 1, type: { name: 'normal', url: 'https://pokeapi.co/api/v2/type/1/' } }],
  sprites: { front_default: 'URL' }
};

describe('<PokemonPage />', () => {
  it('should render abilities', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: pokemonList });
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/pokemon/eevee']}>
          <PokemonPage pokemonList={[]} />
        </MemoryRouter>
      );
    });
    expect(await screen.findByText('adaptability')).toBeVisible();
    expect(await screen.findByText('anticipation')).toBeVisible();
  });
  
  it('should render stats', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: pokemonList });
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/pokemon/eevee']}>
          <PokemonPage pokemonList={[]} />
        </MemoryRouter>
      );
    });
    expect(await screen.findByText('hp')).toBeVisible();
    expect(await screen.findByText('attack')).toBeVisible();
    
    const statsValues = await screen.findAllByTestId('stats-value');
    const values = statsValues.map(el => el.textContent);
    expect(values).toContain('55');
    expect(values).toContain('65');
  });
});