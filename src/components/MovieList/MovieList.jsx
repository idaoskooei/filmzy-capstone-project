import React from 'react';
import './MovieList.scss';

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            {/* <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} /> */}
            <div className="movie-details">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-release-date">{movie.release_date}</p>
              <p className="movie-description">{movie.overview}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No movies found for this category.</p>
      )}
    </div>
  );
};

export default MovieList;
