import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PokemonDetail() {
  const { name } = useParams();
  const navigate = useNavigate();

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

  if (error) return <p>Something went wrong</p>;
  if (!pokemon) return <p>Loading...</p>;

  return (
    <div>
      {/* Back */}
      <button onClick={() => navigate(-1)}>Back</button>

      {/* Title */}
      <h1>{pokemon.name}</h1>

      {/* Image */}
      <div>
        {pokemon.sprites?.front_default && (
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        )}
      </div>

      {/* Basic Info */}
      <div>
        <h3>Basic Info</h3>
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight}</p>
      </div>

      {/* Abilities */}
      <div>
        <h3>Abilities</h3>
        <div>
          {pokemon.abilities?.map((a) => (
            <span key={a.ability.name}>{a.ability.name}</span>
          ))}
        </div>
      </div>

      {/* Types */}
      <div>
        <h3>Types</h3>
        <div>
          {pokemon.types?.map((t) => (
            <span key={t.type.name}>{t.type.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
