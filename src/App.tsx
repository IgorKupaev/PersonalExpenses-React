import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import ItemPage from './pages/ItemPage/ItemPage';
import MainPage from './pages/MainPage';

const App:FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.appContainer}>  
        <Routes>
          <Route path="/:id" element={<ItemPage />}/>
          <Route path="*" element={<MainPage />}/>
          <Route path="/" element={<MainPage />}/>
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;