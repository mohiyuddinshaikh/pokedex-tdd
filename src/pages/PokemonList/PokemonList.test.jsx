import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import PokemonList from "./PokemonList";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
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

  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>,
  );

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
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<div>Detail Page</div>} />
      </Routes>
    </MemoryRouter>,
  );

  const card = await screen.findByText(/pikachu/i);
  await userEvent.click(card);

  expect(await screen.findByText(/detail page/i)).toBeInTheDocument();
});

test("filters pokemon list based on search input", async () => {
  axios.get.mockResolvedValue({
    data: {
      results: [
        { name: "pikachu" },
        { name: "bulbasaur" },
        { name: "charmander" },
      ],
    },
  });

  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>,
  );

  // wait for list to render
  await screen.findByText(/pikachu/i);

  // type into search
  const input = screen.getByRole("textbox");
  await userEvent.type(input, "pika");

  // expect filtered result
  expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/charmander/i)).not.toBeInTheDocument();
});

test("loads next page of pokemon when next button is clicked", async () => {
  axios.get
    .mockResolvedValueOnce({
      data: {
        results: [{ name: "pikachu" }],
      },
    })
    .mockResolvedValueOnce({
      data: {
        results: [{ name: "bulbasaur" }],
      },
    });

  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>,
  );

  // first page
  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();

  // click next
  const nextButton = screen.getByRole("button", { name: /next/i });
  await userEvent.click(nextButton);

  // second page
  expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
});

test("goes back to previous page when prev is clicked", async () => {
  axios.get
    .mockResolvedValueOnce({
      data: { results: [{ name: "pikachu" }] },
    })
    .mockResolvedValueOnce({
      data: { results: [{ name: "bulbasaur" }] },
    })
    .mockResolvedValueOnce({
      data: { results: [{ name: "pikachu" }] },
    });

  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>,
  );

  // first page
  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();

  // go to next page
  await userEvent.click(screen.getByRole("button", { name: /next/i }));
  expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();

  // go back
  await userEvent.click(screen.getByRole("button", { name: /prev/i }));

  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
});
