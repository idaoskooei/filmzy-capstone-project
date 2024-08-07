import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import ChoicesPage from './pages/ChoicesPage/ChoicesPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/homePage" />} />
            <Route path="/homePage" element={<HomePage />} />
            // <Route path="/choicesPage" element={<ChoicesPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;