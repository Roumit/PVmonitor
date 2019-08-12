import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from '@material-ui/core';
import{ BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./containers/login";
import Installations from './containers/installations';
import { orange, lightBlue, blue } from '@material-ui/core/colors';
import { getCookie } from './containers/cookieGetSet';
import { setIsLogin } from './reducers/loginVRM';



const mainTheme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: orange,
  }
});

const Page404 = () =>(
  <div>
    <h2>404 Error: Page not found</h2>
    <Link to="/sites">Go to main</Link>
  </div>   
  );

class App extends React.Component{
  componentWillMount(){
    const cookie = JSON.parse(getCookie("loginVRM"));
    console.log(cookie);
    this.props.setFromCokie(cookie);
  }
  render(){
    return(
      <ThemeProvider theme={mainTheme}>
      <div className="app">
        <h1>
          PV monitor
        </h1>
        <Login />
        <BrowserRouter basename="/application">
          <Switch>
            <Route exact path="/" component={Installations} />
            <Route path="/sites" component={Installations} />
            <Route component={Page404} />
          </Switch>
        </BrowserRouter>
      </div>
      </ThemeProvider>
    )
  }
}


const mapDispatchtoProps = {
  setFromCokie: setIsLogin,
};

const mapStateToProps = state => ({

});


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

export default connect(mapStateToProps, mapDispatchtoProps)(App);
