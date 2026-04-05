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

  const items = await screen.findAllByRole("listitem");
  expect(items.length).toBe(2);
});
