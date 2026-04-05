import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import PokemonList from "./PokemonList";
import axios from "axios";

test("shows loading initially", () => {
  render(<PokemonList />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

vi.mock("axios");

test("renders pokemon list after fetch", async () => {
  axios.get.mockResolvedValue({
    data: {
      results: [{ name: "pikachu" }, { name: "bulbasaur" }],
    },
  });

  render(<PokemonList />);

  expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
});

test("shows error message when API fails", async () => {
  axios.get.mockRejectedValue(new Error("API Error"));

  render(<PokemonList />);

  const error = await screen.findByText(/something went wrong/i);

  expect(error).toBeInTheDocument();
});
