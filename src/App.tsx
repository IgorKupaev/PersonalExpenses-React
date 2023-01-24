import React, { FC } from 'react';
import './App.scss';
import MainPage from './pages/MainPage';

const App:FC = () => {
  return (
    <div className="app">
      <div className="appContainer">
        <MainPage />
      </div>
    </div>
  )
}

export default App;