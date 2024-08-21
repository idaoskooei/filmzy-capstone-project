import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "./Search.scss";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie`,
          {
            params: {
              api_key: "b374a90d9ab89653cff28333dccd5836",
              query: query,
              adult: false,
            },
          }
        );
        const results = response.data.results;
        if (results.length === 0) {
          setNoResults(true);
        } else {
          setMovies(results);
          setNoResults(false);
        }
      } catch (error) {
        console.error("Error fetching data from TMDB", error);
      }
    }
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movieDetail/${movieId}`);
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
      {noResults ? (
        <div className="no-results">No movies found with that title. Try again!</div>
      ) : (
        <div className="movie-results">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-title">{movie.title}</div>
              <div className="movie-release-date">
                Release Date: {movie.release_date}
              </div>
              <div className="movie-description">{movie.overview}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
