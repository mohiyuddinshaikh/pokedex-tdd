import { useEffect, useState } from "react";
import axios from "axios";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);

  async function fetchPokemon() {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    setPokemon(response?.data?.results);
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (pokemon.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {pokemon.map((p) => (
        <li key={p.name}>{p.name}</li>
      ))}
    </ul>
  );
}
