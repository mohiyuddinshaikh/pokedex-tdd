import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import PokemonList from "./PokemonList";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

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

  const pikachu = await screen.findByText(/pikachu/i);
  const bulbasaur = await screen.findByText(/bulbasaur/i);

  expect(pikachu).toBeInTheDocument();
  expect(bulbasaur).toBeInTheDocument();
});

test("shows error message when API fails", async () => {
  axios.get.mockRejectedValue(new Error("API Error"));

  render(<PokemonList />);

  const error = await screen.findByText(/something went wrong/i);

  expect(error).toBeInTheDocument();
});

test("navigates to pokemon detail page on card click", async () => {
  axios.get.mockResolvedValue({
    data: {
      results: [{ name: "pikachu" }],
    },
  });

  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>,
  );

  const card = await screen.findByText(/pikachu/i);

  await userEvent.click(card);

  expect(window.location.pathname).toBe("/pokemon/pikachu");
});
