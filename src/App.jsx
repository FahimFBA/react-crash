import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "https://api.themoviedb.org/3/search/multi";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const SEARCH_FILTERS = [
  { label: "All", value: "all" },
  { label: "Movies", value: "movie" },
  { label: "TV", value: "tv" },
  { label: "People", value: "person" },
];

const getReleaseYear = (date) => (date ? date.slice(0, 4) : "Unknown");

const normalizeResult = (item) => {
  const isPerson = item.media_type === "person";
  const title = item.title || item.name || "Untitled";
  const date = item.release_date || item.first_air_date;
  const imagePath = isPerson ? item.profile_path : item.poster_path;

  return {
    id: `${item.media_type}-${item.id}`,
    title,
    year: isPerson ? "Person" : getReleaseYear(date),
    type: item.media_type,
    poster: imagePath ? `${TMDB_IMAGE_URL}${imagePath}` : "",
    rating: item.vote_average ? item.vote_average.toFixed(1) : "",
    overview: item.overview || item.known_for_department || "No summary available.",
  };
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    searchMovies("Matrix");
  }, []);

  const searchMovies = async (title) => {
    const query = title.trim();

    if (!query) {
      setMovies([]);
      setMessage("Search for a movie, show, or person.");
      return;
    }

    if (!TMDB_ACCESS_TOKEN && !TMDB_API_KEY) {
      setMovies([]);
      setMessage("Add a TMDB token or API key to search.");
      return;
    }

    setIsLoading(true);
    setMessage("");
    setActiveFilter("all");

    try {
      const params = new URLSearchParams({
        query,
        include_adult: "false",
        language: "en-US",
        page: "1",
      });

      const requestOptions = {};

      if (TMDB_ACCESS_TOKEN) {
        requestOptions.headers = {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        };
      } else {
        params.set("api_key", TMDB_API_KEY);
      }

      const response = await fetch(`${API_URL}?${params}`, requestOptions);

      if (!response.ok) {
        throw new Error("TMDB search failed.");
      }

      const data = await response.json();
      const results = (data.results || [])
        .filter(({ media_type }) => ["movie", "tv", "person"].includes(media_type))
        .map(normalizeResult);

      setMovies(results);
      setMessage(results.length ? "" : "No results found.");
    } catch (error) {
      setMovies([]);
      setMessage("Could not load results from TMDB. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  const filteredMovies =
    activeFilter === "all"
      ? movies
      : movies.filter((movie) => movie.type === activeFilter);

  return (
    <div className="app">
      <h1>MovieFinder</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search movies, TV shows, or people"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      <div className="filters" aria-label="Result filters">
        {SEARCH_FILTERS.map((filter) => (
          <button
            className={activeFilter === filter.value ? "active" : ""}
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="empty">
          <h2>Searching TMDB...</h2>
        </div>
      ) : filteredMovies?.length > 0 ? (
        <div className="container">
          {filteredMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>{message || "No results found"}</h2>
        </div>
      )}
    </div>
  );
};

export default App;
