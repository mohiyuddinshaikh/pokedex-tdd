import { render, screen } from "@testing-library/react";
import PokemonList from "./PokemonList";
import { expect, test } from "vitest";

test("shows loading initially", () => {
  render(<PokemonList />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
