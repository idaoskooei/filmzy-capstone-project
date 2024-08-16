import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./MovieList.scss";
import HeartIcon from "../HeartIcon/HeartIcon";

const MovieList = ({ movies }) => {
  const [likedMovies, setLikedMovies] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const savedLikedMovies = JSON.parse(localStorage.getItem("likedMovies")) || {};
    setLikedMovies(savedLikedMovies);
  }, []);

  useEffect(() => {
    localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
  }, [likedMovies]);

  const handleMovieClick = (movieId) => {
    navigate(`/movieDetail/${movieId}`);
  };

  const handleLikeToggle = (movieId) => {
    const newLikedMovies = { ...likedMovies };
  
    if (newLikedMovies[movieId]) {
      delete newLikedMovies[movieId];
    } else {
      newLikedMovies[movieId] = true;
    }
  
    setLikedMovies(newLikedMovies);
    localStorage.setItem("likedMovies", JSON.stringify(newLikedMovies));
  };
  

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="movie-list">
      {currentMovies.length > 0 ? (
        currentMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className="movie-poster"
            />
            <div className="movie-details">
              <h3
                className="movie-title"
                data-release-date={movie.release_date}
              >
                {movie.title}
              </h3>
              <HeartIcon
                liked={likedMovies[movie.id] || false}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikeToggle(movie.id);
                }}
              />
              <p className="movie-description">{movie.overview}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No movies found for this category.</p>
      )}

      <div className="pagination-controls">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </section>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
      runtime: PropTypes.number.isRequired,
      genres: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
      original_language: PropTypes.string.isRequired,
      homepage: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MovieList;
