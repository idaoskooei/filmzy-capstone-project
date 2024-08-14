import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import ChoicesPage from './pages/ChoicesPage/ChoicesPage';
import SearchByCategoryPage from './pages/SearchByCategoryPage/SearchByCategotyPage';
import SearchByTermPage from './pages/SearchPage/SearchPage';
import MovieListPage from './pages/MovieListPage/MovieListPage';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage';
import RandomMoviePage from './pages/RandomMoviePage/RandomMoviePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
           <Route path="/" element={<Navigate to="/homePage" />} />
           <Route path="/homePage" element={<HomePage />} />
           <Route path="/choicesPage" element={<ChoicesPage />} />
           <Route path="/categoryPage" element={<SearchByCategoryPage />} />
           <Route path="/searchPage" element={<SearchByTermPage />} />
           <Route path="/movieListPage/:genreId" element={<MovieListPage />} />
           <Route path="/movieDetail/:movieId" element={<MovieDetailPage />} />
           <Route path="/randomMovie" element={<RandomMoviePage />} />
           <Route path="/profile" element={<ProfilePage />} />
           <Route path="/signin" element={<SignInPage />} />
           <Route path="/signup" element={<SignUpPage />} />

          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;