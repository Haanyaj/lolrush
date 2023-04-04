import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from './Theme'
import { createStore, useStore } from 'react-hookstore';
import Routes from './Routes/Routes'
import menu from './globals/Menu' // for the demo

createStore('themeStore', theme); // for the demo
createStore('pageStore', menu); // for the demo
createStore('stickyStore', true); // for the demo
createStore('searchStore', false); // for the demo
createStore('authStore', localStorage.getItem('isLoggedIn'));


function App() {
  const [ themeColor, setThemeColor ] = useStore('themeStore'); // for the demo
  const [ sticky, setSticky ] = useStore('stickyStore'); // for the demo
  const [ search, setSearch ] = useStore('searchStore'); // for the demo
  
  return (
    <ThemeProvider theme={themeColor}>
      <CssBaseline />
      <div className="App">
        <NavBar search={search} sticky={sticky} />
        <Routes />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
