import React from 'react';
import { render, screen, act } from '@testing-library/react';
import axiosMock from 'axios';
import '@testing-library/jest-dom';
import App from '../src/App';

jest.mock('axios');

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('<App />', () => {
  it('fetches data', async () => {
    axiosMock.get.mockResolvedValueOnce({ data: { results: [{ url: 'https://pokeapi.co/api/v2/pokemon/1/', name: 'bulbasaur', id: 1 }] } });
    await act(async () => { render(<App />); });
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/?limit=784');
  });
  
  it('shows LoadingSpinner', async () => {
    axiosMock.get.mockReturnValueOnce(new Promise(() => {}));
    await act(async () => { render(<App />); });
    expect(screen.getByAltText('Loading...')).toBeVisible();
  });
  
  it('shows error', async () => {
    axiosMock.get.mockRejectedValueOnce(new Error());
    await act(async () => { render(<App />); });
    expect(await screen.findByTestId('error')).toBeVisible();
  });
});