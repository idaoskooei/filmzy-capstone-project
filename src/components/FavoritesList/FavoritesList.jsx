import './FavoritesList.scss';

const FavoritesList = ({ favorites, onMovieClick }) => {
    if (favorites.length === 0) {
        return <p>No favorite movies found.</p>;
    }

    return (
        <div className="favorites-list">
            {favorites.map((movie) => (
                <div key={movie.id} className="movie-card" onClick={() => onMovieClick(movie.id)}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`${movie.title} poster`}
                        className="movie-poster"
                    />
                    <div className="movie-details">
                        <h3 className="movie-title">{movie.title}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FavoritesList;