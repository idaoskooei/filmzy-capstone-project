import { useNavigate } from 'react-router-dom';
import './MovieList.scss';

const MovieList = ({ movies }) => {
  console.log('MovieList component rendered');
  const navigate = useNavigate(); 
  console.log(navigate);

  const handleMovieClick = (movieId) => {
    console.log('Clicked movie ID:', movieId);
    navigate(`/movieDetail/${movieId}`);
  };
  
  return (
    <section className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie) => (
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
              <p className="movie-description">{movie.overview}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No movies found for this category.</p>
      )}
    </section>
  );
};

export default MovieList;
