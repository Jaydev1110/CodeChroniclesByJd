# Game B Vite Setup Summary

## Overview
Successfully set up the `game_b_rust` project using Vite + React, integrated the Rust/Wasm core logic (`elara-lib`), and resolved all build and runtime issues. The application now loads directly to a level selector, bypassing the narrative, and allows playing all levels.

## Key Accomplishments
1.  **Project Initialization**: Created a new Vite + React project.
2.  **Wasm Integration**:
    *   Configured `vite-plugin-wasm` and `vite-plugin-top-level-await`.
    *   Set up aliases in `vite.config.ts` to correctly resolve `elara-lib`.
    *   Updated all import paths in the codebase to use `@/elara-lib/elara_lib` (or `@/elara-lib` for default export).
3.  **Frontend Porting**:
    *   Ported essential components, hooks, and contexts from the original codebase.
    *   Moved assets (images, audio) to `src/images` and `src/audio` and updated references.
4.  **Bypassing Narrative**:
    *   Modified `src/main.tsx` and `src/routes/root.tsx` to load `LevelSelector` by default.
    *   Updated `src/lib/scenes.ts` to unlock all levels.
5.  **Debugging & Fixes**:
    *   **Wasm 404 Error**: Resolved by fixing import paths and ensuring the Wasm module is loaded correctly.
    *   **Silent Crash**: Identified a missing build-time variable `ELARA_BUILD_TARGET` which caused a silent failure during app initialization. Fixed by defining it in `vite.config.ts`.
    *   **Lint Errors**: Addressed various lint errors related to imports and types.

## How to Run
1.  Navigate to the project directory:
    ```bash
    cd game_b_rust
    ```
2.  Install dependencies (if not already done):
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser to `http://localhost:5173`.

## Project Structure
*   `src/elara-lib`: Contains the Rust/Wasm bindings (`elara_lib.js`, `elara_lib_bg.wasm`, `elara_lib.d.ts`).
*   `src/components`: React components for the game UI.
*   `src/routes`: Route components (LevelSelector, Level, etc.).
*   `src/lib`: Utility functions and game logic.
*   `vite.config.ts`: Vite configuration including Wasm plugin and aliases.

## Notes
*   The application is configured to target the "web" environment (`ELARA_BUILD_TARGET: "web"`).
*   All levels are unlocked by default for testing purposes.
