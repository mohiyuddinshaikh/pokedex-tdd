import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { expect, test, vi } from "vitest";
import axios from "axios";
import PokemonDetail from "./PokemonDetail";
import userEvent from "@testing-library/user-event";

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

test("navigates back to list page when back button is clicked", async () => {
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
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </MemoryRouter>,
  );

  // wait for detail page
  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();

  // click back
  await userEvent.click(screen.getByRole("button", { name: /back/i }));

  // expect list page (loading or list content)
  expect(await screen.findByText(/loading/i)).toBeInTheDocument();
});
