import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { init, selectToken } from './app/authSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import AuthPage from './Pages/AuthPage';
import MainPage from './Pages/MainPage';

function App() {
  const token = useAppSelector(selectToken);
  const auth = !!token;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());
  }, []);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={auth ? 'main' : 'auth'} />} />
        <Route path='/main' element={auth ? <MainPage /> : <Navigate to='/auth' />} />
        <Route path='/auth' element={!auth ? <AuthPage /> : <Navigate to='/main' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
