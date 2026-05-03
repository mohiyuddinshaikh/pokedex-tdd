import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonList from "./pages/PokemonList/PokemonList";
import PokemonDetail from "./pages/PokemonDetails/PokemonDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
