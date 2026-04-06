import {BrowserRouter, Routes, Route} from 'react-router-dom'

import NewsDetails from './pages/NewsDetails'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news-details" element={<NewsDetails />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
