# MovieFinder

MovieFinder is a Vite + React app for searching movies, TV shows, and people with TMDB multi-search.

The app includes keyboard search, result filters, poster/profile cards, ratings, and short summaries.

The website is deployed on [Netlify](https://react-crash-js-mastery.netlify.app/). You can also check the [video demo from YouTube](https://youtu.be/8S8tFoEDz_w).

## Features

- Search movies, TV shows, and people from one input.
- Filter results by all, movies, TV, or people.
- Show TMDB posters/profile images with fallback cards.
- Display release years, ratings, result type, and summaries.
- Build and deploy with Vite.

## API Setup

MovieFinder uses [TMDB](https://developer.themoviedb.org/) for movie, TV, and people search.

Create a `.env.local` file from `.env.example` and add one of these values:

```bash
VITE_TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
```

or:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
```

On Netlify, add the same variable in **Site configuration > Environment variables**.

## Demo

![Demo](https://raw.githubusercontent.com/FahimFBA/react-crash/main/Demo.png)

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm run dev` - start the Vite development server.
- `npm start` - alias for the Vite development server.
- `npm run build` - build the app for production in `dist`.
- `npm run preview` - preview the production build locally.

## Deployment

Netlify should use:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20.19.0` or newer
- Environment variable: `VITE_TMDB_ACCESS_TOKEN` or `VITE_TMDB_API_KEY`
