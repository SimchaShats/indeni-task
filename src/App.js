import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import store from './reduxStore'
import MainContainer from './pages/MainContainer';

export default function App() {
  return (
    <Provider store={ store }>
      <MainContainer/>
    </Provider>
  );
}
