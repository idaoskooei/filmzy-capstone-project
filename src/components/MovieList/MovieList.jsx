import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './MovieList.scss';
import HeartIcon from '../HeartIcon/HeartIcon';

const MovieList = ({ movies }) => {
  const [likedMovies, setLikedMovies] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const savedLikedMovies = JSON.parse(localStorage.getItem('likedMovies')) || {};
    setLikedMovies(savedLikedMovies);
  }, []);

  useEffect(() => {
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
  }, [likedMovies]);

  const handleMovieClick = (movieId) => {
    navigate(`/movieDetail/${movieId}`);
  };

  const handleLikeToggle = (movieId) => {
    const newLikedMovies = {
        ...likedMovies,
        [movieId]: !likedMovies[movieId],
    };
    setLikedMovies(newLikedMovies);
    localStorage.setItem('likedMovies', JSON.stringify(newLikedMovies));

    const updatedFavorites = Object.keys(newLikedMovies)
        .filter(id => newLikedMovies[id])
        .map(id => movies.find(movie => movie.id === id));

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
          <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} poster`}
              className="movie-poster"
            />
            <div className="movie-details">
              <h3 className="movie-title" data-release-date={movie.release_date}>
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

export default MovieList;
