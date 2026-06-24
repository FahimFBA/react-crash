import React from "react";

const typeLabels = {
  movie: "Movie",
  tv: "TV Show",
  person: "Person",
};

const MovieCard = ({ movie: { year, poster, title, type, rating, overview } }) => {
  return (
    <article className="movie">
      <div>
        <p>{year}</p>
        {rating && <p>{rating}/10</p>}
      </div>

      <div>
        {poster ? (
          <img src={poster} alt={title} />
        ) : (
          <div className="poster-empty">{typeLabels[type]}</div>
        )}
      </div>

      <div>
        <span>{typeLabels[type] || type}</span>
        <h3>{title}</h3>
        <p>{overview}</p>
      </div>
    </article>
  );
};

export default MovieCard;
