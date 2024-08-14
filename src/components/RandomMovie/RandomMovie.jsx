import { useState, useEffect } from 'react';
import axios from 'axios';
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

      setMovie(randomMovie);
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
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-release-date">{movie.release_date}</p>
          <p className="movie-overview">{movie.overview}</p>
        </div>
      </div>
      <button className="refresh-button" onClick={fetchRandomMovie}>Get New Recommendation</button>
    </div>
  );
};

export default RandomMovie;
