import React, { useState } from 'react';
import './style.css';

function App() {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');

  const loadPokemon = async () => {
    try {
      setError('');
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
      if (!response.ok) throw new Error('Pokémon não encontrado');

      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setPokemon(null);
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <header>
        <strong>Pokédex</strong>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          loadPokemon();
        }}
      >
        <input
          type="text"
          placeholder="Digite o nome do Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pokemon && (
        <div className="pokemon-info">
          <img src={pokemon.sprites?.front_default} alt={pokemon.name} />
          <h2>{pokemon.name.toUpperCase()}</h2>
          <p><strong>N°:</strong> {pokemon.id}</p>
          <p><strong>Peso:</strong> {pokemon.weight / 10} Kg</p>
          <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
          <p><strong>Tipo(s):</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
          <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
