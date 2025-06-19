import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Home from './pages/Home';
import Hardware from './pages/Hardware';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/hardware' element={<Hardware />} />
      </Routes>
    </Router>
  );
}

export default App;