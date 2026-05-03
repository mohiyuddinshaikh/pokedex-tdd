import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);

  async function fetchPokemon() {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`,
      );
      setPokemon(response?.data?.results);
    } catch (e) {
      setError(true);
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, [offset]);

  if (error) {
    return <p>Something went wrong</p>;
  }

  if (pokemon.length === 0) {
    return <p>Loading...</p>;
  }

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredPokemon.map((p) => (
          <li key={p.name}>
            <PokemonCard name={p.name} />
          </li>
        ))}
      </ul>

      <button onClick={() => setOffset((prev) => Math.max(prev - 20, 0))}>
        Prev
      </button>
      <button onClick={() => setOffset((prev) => prev + 20)}>Next</button>
    </div>
  );
}
