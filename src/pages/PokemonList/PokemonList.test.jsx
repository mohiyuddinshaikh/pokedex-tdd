import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import PokemonList from "./PokemonList";

test("shows loading initially", () => {
  render(<PokemonList />);
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
