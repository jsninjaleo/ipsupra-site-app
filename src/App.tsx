import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home/Home';
import { Footer } from './layout/Footer';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;