import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Popular from './pages/Popular';
import TvSeries from './pages/TvSeries';
import Animation from './pages/Animation';
import Adventure from './pages/Adventure';
import Crime from './pages/Crime';
import Science from './pages/Science';
import Movie from './pages/Movie';
import Series from './pages/Series';
import SearchedMovie from './pages/SearchedMovie';
import TopRated from './pages/TopRated';
import Genres from './pages/Genres';
import Contact from './pages/Contact';

function App() {
  return (
    <Router basename='/DevanCinema'>
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Popular' element={<Popular />} />
        <Route path='/TvSeries' element={<TvSeries />} />
        <Route path='/Animation' element={<Animation />} />
        <Route path='/Adventure' element={<Adventure />} />
        <Route path='/Crime' element={<Crime />} />
        <Route path='/Science' element={<Science />} />
        <Route path='/Movie/:id' element={<Movie />} />
         <Route path='/Series/:id' element={<Series />} />
         <Route path='/Query/:id' element={<SearchedMovie />} />
         <Route path='/TopRated' element={<TopRated />} />
         <Route path='/Genre' element={<Genres/>} />
         <Route path='/About' element={<Contact/>} />
         <Route path='/*' element={<Navigate to="/" />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
