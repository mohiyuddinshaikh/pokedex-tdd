import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PokemonDetail() {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(false);

  async function fetchPokemon() {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      setPokemon(res.data);
    } catch (e) {
      setError(true);
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, [name]);

  if (error) {
    return <p>Something went wrong</p>;
  }

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
  );
}
