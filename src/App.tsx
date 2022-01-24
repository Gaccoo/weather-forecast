import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Layout from './layout/Layout';
import WeatherForecast from './pages/WeatherForecast';

const App = () => (
  <div className="App">
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<Layout />}>
        <Route path="weather-forecast" element={<WeatherForecast />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </div>
);

export default App;
