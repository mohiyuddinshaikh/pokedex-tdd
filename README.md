# Pokedex

A modern React-based Pokedex application built with Vite. This project allows users to browse and view details about various Pokémon.
Deployed on: https://pokemon-tdd.netlify.app/

## Setup Instructions

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mohiyuddinshaikh/pokedex-tdd.git
   cd pokedex
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Run tests:**

   ```bash
   npm run test
   ```

5. **Build for production:**

   ```bash
   npm run build
   ```

6. **Preview the production build:**
   ```bash
   npm run preview
   ```

## Architectural Decisions

- **React with Vite:** The project uses React for building the user interface and Vite for fast development and optimized builds.
- **Component-based structure:** The application is divided into reusable components, such as `PokemonCard` and `Pagination`, to ensure modularity and maintainability.
- **CSS Modules:** CSS files are scoped to their respective components/pages to avoid style conflicts.
- **Testing:** Unit tests are written using Jest and React Testing Library to ensure the reliability of components.

## Trade-offs Made

- **Vite over Create React App (CRA):** Vite was chosen for its faster build times and modern tooling, but it may have less community support compared to CRA.
- **CSS Modules instead of a CSS-in-JS library:** While CSS Modules provide simplicity, they lack the dynamic styling capabilities of CSS-in-JS solutions like styled-components.
- **Focus on core features:** Advanced features like offline support or animations were deprioritized to focus on delivering a functional Pokedex.

## AI Usage Details

AI tools were used to:

- Generate boilerplate code for components and pages.
- Assist in writing unit tests for components.
- Provide suggestions for architectural decisions and trade-offs.
- Understand and implement TDD.

## Folder Structure

```
public/          # Static assets
src/             # Source code
  assets/        # Images and other assets
  components/    # Reusable components
  pages/         # Page-level components
  services/      # API and utility functions
```

## Screenshots

List:
<img width="1914" height="961" alt="Screenshot 2026-05-03 100707" src="https://github.com/user-attachments/assets/0354fdf9-2ab7-44f2-bfac-f76815521f1d" />

Filter:
<img width="1903" height="909" alt="Screenshot 2026-05-03 100721" src="https://github.com/user-attachments/assets/a62c691a-c9dd-4a68-af83-88fdabc62ac9" />

Details:
<img width="1913" height="899" alt="Screenshot 2026-05-03 100738" src="https://github.com/user-attachments/assets/43527266-69c2-42d7-945b-335f69010fd3" />




## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

Happy coding!
