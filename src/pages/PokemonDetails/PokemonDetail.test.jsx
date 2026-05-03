import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { expect, test, vi } from "vitest";
import axios from "axios";
import PokemonDetail from "./PokemonDetail";
import userEvent from "@testing-library/user-event";
import PokemonList from "../PokemonList/PokemonList";

vi.mock("axios");

test("renders pokemon detail after fetch", async () => {
  axios.get.mockResolvedValue({
    data: {
      name: "pikachu",
      height: 4,
      weight: 60,
      sprites: { front_default: "pikachu.png" },
      abilities: [],
      types: [],
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
  axios.get
    // first call → detail page
    .mockResolvedValueOnce({
      data: {
        name: "pikachu",
        height: 4,
        weight: 60,
      },
    })
    // second call → list page
    .mockResolvedValueOnce({
      data: {
        results: [{ name: "pikachu" }],
      },
    });

  render(
    <MemoryRouter initialEntries={["/", "/pokemon/pikachu"]} initialIndex={1}>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();

  await userEvent.click(screen.getByRole("button", { name: /back/i }));

  // now list page should appear
  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
});

test("renders detailed pokemon information including image, abilities and types", async () => {
  axios.get.mockResolvedValue({
    data: {
      name: "pikachu",
      height: 4,
      weight: 60,
      abilities: [
        { ability: { name: "static" } },
        { ability: { name: "lightning-rod" } },
      ],
      types: [{ type: { name: "electric" } }],
      sprites: {
        front_default: "pikachu.png",
      },
    },
  });

  render(
    <MemoryRouter initialEntries={["/pokemon/pikachu"]}>
      <Routes>
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </MemoryRouter>,
  );

  // main data
  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();

  // basic info
  expect(screen.getByText(/height/i)).toBeInTheDocument();
  expect(screen.getByText(/weight/i)).toBeInTheDocument();

  // abilities (ALL, not just one)
  expect(screen.getByText(/static/i)).toBeInTheDocument();
  expect(screen.getByText(/lightning-rod/i)).toBeInTheDocument();

  // types
  expect(screen.getByText(/electric/i)).toBeInTheDocument();

  // image
  expect(screen.getByRole("img")).toBeInTheDocument();
});
