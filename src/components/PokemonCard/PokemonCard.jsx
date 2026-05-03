import { useNavigate } from "react-router-dom";

export default function PokemonCard({ name }) {
  const navigate = useNavigate();

  return <p onClick={() => navigate(`/pokemon/${name}`)}>{name}</p>;
}
