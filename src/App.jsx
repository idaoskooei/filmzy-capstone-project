import './App.scss'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Welcome from './components/Welcome/Welcome';


function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Welcome />
      </div>
      <Footer />
    </div>
  );
}

export default App;