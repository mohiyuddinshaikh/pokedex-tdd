import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("renders PokemonList on root route", () => {
  render(<App />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
