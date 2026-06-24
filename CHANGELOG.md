# Changelog

## [0.1.2] - 2026-06-24

### Changed

- Replaced the old OMDb search integration with TMDB multi-search for movies, TV shows, and people.
- Added result filters and richer cards with ratings, summaries, and TMDB poster/profile images.
- Documented the required TMDB environment variables for local development and Netlify.

## [0.1.1] - 2026-06-23

### Security

- Replaced Create React App's deprecated `react-scripts` toolchain with Vite to remove vulnerable transitive dependencies reported by Dependabot.
- Regenerated npm dependency metadata for the updated build stack.

### Changed

- Updated the React entry point to use the React 18 `createRoot` API.

## [0.1.0] - 2023-06-27

### Added

- Initial MovieFinder React application.
