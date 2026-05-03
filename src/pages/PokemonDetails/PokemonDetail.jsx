import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PokemonDetail.css";

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
    <div className="pokemon-detail-container">
      {/* Back Button */}
      <button className="pokemon-back-button" onClick={() => navigate(-1)}>
        Back
      </button>

      {/* Title */}
      <h1 className="pokemon-detail-title">{pokemon.name}</h1>

      {/* Image */}
      <div className="pokemon-image-container">
        {pokemon.sprites?.front_default && (
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="pokemon-detail-image"
          />
        )}
      </div>

      <div className="pokemon-details-section">
        <div className="pokemon-basic-info">
          <h3>Basic Info</h3>
          <p>
            <b>Height:</b> {pokemon.height / 10} m
          </p>
          <p>
            <b>Weight:</b> {pokemon.weight / 10} kg
          </p>
          <p>
            <b>Abilities:</b>{" "}
            {pokemon.abilities?.map((a) => a.ability.name).join(", ")}
          </p>
        </div>

        <div className="pokemon-type-info">
          <h3>Types</h3>
          <div>
            {pokemon.types?.map((t) => (
              <span
                key={t.type.name}
                className={`pokemon-type-badge ${t.type.name}`}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
