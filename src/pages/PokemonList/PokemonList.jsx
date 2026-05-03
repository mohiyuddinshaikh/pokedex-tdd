import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Pagination from "../../components/Pagination/Pagination";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 20;
  const MAX_PAGE = 20; // 👈 updated
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

  // Sliding window: [page, page+1, page+2]
  const visiblePages = [page, page + 1, page + 2].filter((p) => p <= MAX_PAGE);

  return (
    <div className="pokemon-list-container">
      {/* Search */}
      <input
        type="text"
        placeholder="Search Pokémon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pokemon-search"
      />

      {/* List */}
      <ul className="pokemon-list">
        {filteredPokemon.map((p) => (
          <li key={p.name} className="pokemon-list-item">
            <PokemonCard name={p.name} />
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <Pagination
        visiblePages={visiblePages}
        page={page}
        setPage={setPage}
        maxPage={MAX_PAGE}
      />
    </div>
  );
}
