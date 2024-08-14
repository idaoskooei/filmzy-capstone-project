import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaClock, FaFilm, FaGlobe, FaLink, FaInfoCircle, FaLanguage } from 'react-icons/fa';

import './RandomMovie.scss'; 

const RandomMovie = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomMovie = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
          api_key: 'b374a90d9ab89653cff28333dccd5836',
          language: 'en-US'
        }
      });

      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];

      const detailResponse = await axios.get(`https://api.themoviedb.org/3/movie/${randomMovie.id}`, {
        params: {
          api_key: 'b374a90d9ab89653cff28333dccd5836',
          language: 'en-US'
        }
      });

      setMovie(detailResponse.data);
    } catch (error) {
      console.error('Error fetching random movie:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!movie) return <p>No movie found.</p>;

  return (
    <div className="random-movie">
      <h2>Random Movie Recommendation</h2>
      <div className="movie-details">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        <div className="movie-info">
          <p><FaFilm /> Title: {movie.title}</p>
          <p><FaCalendarAlt /> Release Date: {movie.release_date}</p>
          <p><FaClock /> Duration: {movie.runtime ? `${movie.runtime} mins` : 'Not available'}</p>
          <p><FaLanguage /> Language: {movie.original_language}</p>
          <p><FaLink /> Website: <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a></p>
          <p><FaInfoCircle /> Overview: {movie.overview}</p>
        </div>
      </div>
      <button className="refresh-button" onClick={fetchRandomMovie}>Get New Recommendation</button>
    </div>
  );
};

export default RandomMovie;
