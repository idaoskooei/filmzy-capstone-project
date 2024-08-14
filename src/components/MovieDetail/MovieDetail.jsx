import './MovieDetail.scss';
import { FaCalendarAlt, FaClock, FaFilm, FaGlobe, FaLink, FaInfoCircle, FaLanguage } from 'react-icons/fa';

const MovieDetail = ({ movie }) => {
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <div className="movie-detail-column1">
        <h2 className="movie-title">{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} Poster`}
          className="movie-poster"
        />
      </div>
      <div className="movie-detail-column2">
        <p><FaCalendarAlt /> Release Date: {movie.release_date}</p>
        <p><FaClock /> Duration: {movie.runtime} mins</p>
        <p><FaFilm /> Genre: {movie.genres.map(genre => genre.name).join(', ')}</p>
        <p><FaLanguage /> Language: {movie.original_language}</p>
        <p><FaLink /> Website: <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a></p>
        <p><FaInfoCircle /> Overview: {movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetail;