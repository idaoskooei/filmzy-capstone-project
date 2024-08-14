import './MovieDetail.scss';

const MovieDetail = ({ movie }) => {
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-detail">
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      {/* Add more details such as rating, release date, etc. */}
    </div>
  );
};

export default MovieDetail;
