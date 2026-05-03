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

test("navigates to a specific page when page number is clicked", async () => {
  axios.get
    .mockResolvedValueOnce({
      data: { results: [{ name: "pikachu" }] }, // page 1
    })
    .mockResolvedValueOnce({
      data: { results: [{ name: "bulbasaur" }] }, // page 2
    });

  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>,
  );

  // initial page
  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();

  // click page 2
  await userEvent.click(screen.getByRole("button", { name: "2" }));

  // new data
  expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
});

test("shifts page number buttons as user navigates forward", async () => {
  axios.get
    .mockResolvedValueOnce({
      data: { results: [{ name: "pikachu" }] }, // page 1
    })
    .mockResolvedValue({
      data: { results: [{ name: "bulbasaur" }] }, // subsequent pages
    });

  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>,
  );

  // initial state → 1,2,3
  expect(await screen.findByRole("button", { name: "1" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();

  // go to page 3
  await userEvent.click(screen.getByRole("button", { name: "3" }));

  // window should shift → 3,4,5
  expect(await screen.findByRole("button", { name: "3" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "5" })).toBeInTheDocument();

  // old button should be gone
  expect(screen.queryByRole("button", { name: "1" })).not.toBeInTheDocument();
});

test("navigates to first and last page using First and Last buttons", async () => {
  axios.get
    .mockResolvedValueOnce({
      data: { results: [{ name: "pikachu" }] }, // page 1
    })
    .mockResolvedValueOnce({
      data: { results: [{ name: "bulbasaur" }] }, // page 3
    })
    .mockResolvedValueOnce({
      data: { results: [{ name: "pikachu" }] }, // back to page 1
    })
    .mockResolvedValue({
      data: { results: [{ name: "bulbasaur" }] }, // fallback
    });

  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>,
  );

  // initial load (page 1)
  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();

  // go to page 3
  await userEvent.click(screen.getByRole("button", { name: "3" }));

  // go to first
  await userEvent.click(screen.getByRole("button", { name: /first/i }));
  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();

  // go to last (page 20)
  await userEvent.click(screen.getByRole("button", { name: /last/i }));

  // pagination window should now include 20
  expect(await screen.findByRole("button", { name: "20" })).toBeInTheDocument();
});

test("does not go beyond last page when next is clicked", async () => {
  axios.get.mockResolvedValue({
    data: { results: [{ name: "pikachu" }] },
  });

  render(
    <MemoryRouter>
      <PokemonList />
    </MemoryRouter>,
  );

  // ✅ WAIT for UI to load
  await screen.findByText(/pikachu/i);

  // now safe to interact
  await userEvent.click(screen.getByRole("button", { name: /last/i }));

  await userEvent.click(screen.getByRole("button", { name: /next/i }));

  expect(screen.getByRole("button", { name: "20" })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "21" })).not.toBeInTheDocument();
});

test("navigates back to list page when back button is clicked", async () => {
  axios.get.mockResolvedValue({
    data: {
      name: "pikachu",
      height: 4,
      weight: 60,
    },
  });

  render(
    <MemoryRouter initialEntries={["/pokemon/pikachu"]}>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </MemoryRouter>,
  );

  // wait for detail page
  expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();

  // click back
  await userEvent.click(screen.getByRole("button", { name: /back/i }));

  // expect list page (loading or list content)
  expect(await screen.findByText(/loading/i)).toBeInTheDocument();
});
