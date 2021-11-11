import logo from './logo.svg';
import './App.css';
import React from 'react'
import Header from './components/Header/Header.js'
import Footer from './components/Footer/Footer.js'
import routes, { SwitchRouter } from './routes';

function App() {
  return (
    <div className="App">
      <Header/>
      <SwitchRouter routes={routes} />
      <Footer/>
    </div>
  );
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/ads")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>{!data ? "Loading..." : data}</p>
  //     </header>
  //   </div>
  // );
}

export default App;
