import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieDetail from "../../components/MovieDetailPage/MovieDetailPage";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: {
              api_key: "b374a90d9ab89653cff28333dccd5836",
              language: "en-US",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <div className="movie-detail-page">
      <MovieDetail movie={movie} />
    </div>
  );
};

export default MovieDetailPage;
