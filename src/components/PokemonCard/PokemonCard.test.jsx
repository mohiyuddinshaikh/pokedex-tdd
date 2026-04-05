import { render, screen } from "@testing-library/react";
import PokemonCard from "./PokemonCard";
import { expect, test } from "vitest";

test("renders pokemon name", () => {
  render(<PokemonCard name="pikachu" />);

  expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
});
