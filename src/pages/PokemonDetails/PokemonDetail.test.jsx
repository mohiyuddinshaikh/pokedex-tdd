import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { expect, test, vi } from "vitest";
import axios from "axios";
import PokemonDetail from "./PokemonDetail";

vi.mock("axios");

test("renders pokemon detail after fetch", async () => {
  axios.get.mockResolvedValue({
    data: {
      name: "pikachu",
      height: 4,
      weight: 60,
    },
  });

  render(
    <MemoryRouter initialEntries={["/pokemon/pikachu"]}>
      <Routes>
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
  expect(screen.getByText(/height/i)).toBeInTheDocument();
  expect(screen.getByText(/weight/i)).toBeInTheDocument();
});
