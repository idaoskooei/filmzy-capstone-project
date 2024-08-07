import React, { useEffect, useState } from 'react';
import './Categories.scss';
import axios from 'axios';

const CategoryPage = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
          params: {
            api_key: 'b374a90d9ab89653cff28333dccd5836',
            language: 'en-US'
          }
        });
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="category-page">
      <div className="category-content">
        <p className="category-text">choose a category to see movie recommendations!</p>
        <ul className="genre-list">
          {genres.map((genre) => (
            <li key={genre.id} className="genre-item">
              {genre.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryPage;
