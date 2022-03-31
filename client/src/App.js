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
      <div style={{marginTop:'74px'}}>
        <SwitchRouter routes={routes} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
