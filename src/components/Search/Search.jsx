import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import HeartIcon from '../HeartIcon/HeartIcon'; 
import './Search.scss';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [likedMovies, setLikedMovies] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: 'b374a90d9ab89653cff28333dccd5836',
            query: query,
            adult: false,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching data from TMDB', error);
      }
    }
  };

  const handleLikeToggle = (movieId) => {
    setLikedMovies((prevLikedMovies) => ({
      ...prevLikedMovies,
      [movieId]: !prevLikedMovies[movieId],
    }));
  };

  return (
    <div className="search">
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Search for a movie..." 
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="movie-results">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img 
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
              alt={movie.title} 
            />
            <div className="movie-title">{movie.title}</div>
            <div className="movie-release-date">Release Date: {movie.release_date}</div>
            <HeartIcon
              liked={likedMovies[movie.id] || false}
              onClick={(e) => {
                e.stopPropagation();
                handleLikeToggle(movie.id);
              }}
            />
            <div className="movie-description">{movie.overview}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
