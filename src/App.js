import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./pages/Home"
import Bot from './pages/bot.js';
import Salary from './pages/salary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bot" element={<Bot />} />
          <Route path="/salary" element={<Salary />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
