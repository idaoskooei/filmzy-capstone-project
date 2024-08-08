import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import axios from 'axios';

const MovieListPage = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: 'b374a90d9ab89653cff28333dccd5836',
            with_genres: genreId,
            language: 'en-US',
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [genreId]);

  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
};

export default MovieListPage;
