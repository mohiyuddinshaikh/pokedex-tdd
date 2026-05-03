import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 20;
  const offset = (page - 1) * limit;

  async function fetchPokemon() {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      );
      setPokemon(response?.data?.results);
    } catch (e) {
      setError(true);
    }
  }

  useEffect(() => {
    fetchPokemon();
  }, [page]);

  if (error) {
    return <p>Something went wrong</p>;
  }

  if (pokemon.length === 0) {
    return <p>Loading...</p>;
  }

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  // 👇 Sliding window logic
  const visiblePages = [page, page + 1, page + 2];

  return (
    <div>
      {/* Search */}
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* List */}
      <ul>
        {filteredPokemon.map((p) => (
          <li key={p.name}>
            <PokemonCard name={p.name} />
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Prev
        </button>

        {visiblePages.map((p) => (
          <button key={p} onClick={() => setPage(p)}>
            {p}
          </button>
        ))}

        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
}
