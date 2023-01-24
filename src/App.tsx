import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import ItemPage from './pages/ItemPage';
import MainPage from './pages/MainPage';

const App:FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="appContainer">   
          <Routes>
            <Route path="/:id" element={<ItemPage />}/>
            <Route path="*" element={<MainPage />}/>
            <Route path="/" element={<MainPage />}/>
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;