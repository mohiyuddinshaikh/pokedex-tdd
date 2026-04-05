import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import PokemonList from "./PokemonList";

test("shows loading initially", () => {
  render(<PokemonList />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("renders pokemon list after fetch", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    json: async () => ({
      results: [{ name: "pikachu" }, { name: "bulbasaur" }],
    }),
  });

  render(<PokemonList />);

  const items = await screen.findAllByRole("listitem");

  expect(items.length).toBe(2);
});
