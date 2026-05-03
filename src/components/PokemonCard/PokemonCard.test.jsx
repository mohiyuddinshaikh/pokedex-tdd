import { render, screen } from "@testing-library/react";
import PokemonCard from "./PokemonCard";
import { expect, test } from "vitest";
import { MemoryRouter } from "react-router-dom";

test("renders pokemon name", () => {
  render(
    <MemoryRouter>
      <PokemonCard name="pikachu" />
    </MemoryRouter>,
  );

  expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
});
