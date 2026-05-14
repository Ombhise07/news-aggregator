import {BrowserRouter, Routes, Route} from 'react-router-dom'

import NewsDetails from './pages/NewsDetails'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Favorites from './pages/Favorites';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* NewsDetails page */}
        <Route path="/news/:id" element={<NewsDetails />} />

        {/* Favorites paage */}
        <Route path="/favorites" element={<Favorites />} />

        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Register page */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
