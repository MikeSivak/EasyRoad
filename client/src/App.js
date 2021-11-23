import './App.css';
import React, { useState } from 'react'
import Header from './components/Header/Header.js'
import Footer from './components/Footer/Footer.js'
import Home from './components/Home/Home';
import routes, { SwitchRouter } from './routes';

function App() {

  return (
    <div className="App">
      <Header />
      <SwitchRouter routes={routes} />
      <Footer />
    </div>
  );
}

export default App;
