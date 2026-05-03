import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  async function fetchPokemon() {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
      setPokemon(response?.data?.results);
    } catch (e) {
      setError(true);
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, []);

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
    </div>
  );
}
