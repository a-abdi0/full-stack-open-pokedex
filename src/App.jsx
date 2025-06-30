import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useApi } from './useApi';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import PokemonPage from './PokemonPage';
import PokemonList from './PokemonList';

const mapResults = (({ results }) => results.map(({ url, name }) => ({
  url,
  name,
  id: parseInt(url.match(/\/(\d+)\//)[1])
})));

const App = () => {
  const { data: pokemonList, error, isLoading } = useApi('https://pokeapi.co/api/v2/pokemon/?limit=784', mapResults);
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList pokemonList={pokemonList} />} />
        <Route path="/pokemon/:name" element={<PokemonPage pokemonList={pokemonList} />} />
      </Routes>
    </Router>
  );
};

export default App;