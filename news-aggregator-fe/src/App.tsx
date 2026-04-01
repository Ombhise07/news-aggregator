import {BrowserRouter, Routes, Route} from 'react-router-dom'

import NewsDetails from './pages/NewsDetails'
import Home from './pages/Home'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news-details" element={<NewsDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
