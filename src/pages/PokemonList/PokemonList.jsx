import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import PokemonCard from "../../components/PokemonCard/PokemonCard";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);

  const limit = 20;

  async function fetchPokemon() {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      );
      setPokemon((prev) => [...prev, ...response?.data?.results]);
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

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

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

      {/* Load More Button */}
      <button onClick={loadMore} className="load-more-button">
        Load More
      </button>
    </div>
  );
}
