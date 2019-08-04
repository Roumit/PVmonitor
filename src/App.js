import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from '@material-ui/core';

import Login from "./containers/login";
import Installations from './containers/installations';
import { orange, lightBlue, blue } from '@material-ui/core/colors';



const mainTheme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: orange,
  }
});


class App extends React.Component{
  render(){
    return(
      <ThemeProvider theme={mainTheme}>
      <div className="app">
        <h1>
          PV monitor
        </h1>
        <div>Test version</div>
        <Login />
        <Installations />
      </div>
      </ThemeProvider>
    )
  }
}



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
