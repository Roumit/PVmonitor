import React from 'react';
import PropTypes from "prop-types";
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from '@material-ui/core';
import{ BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./containers/login";
import Installations from './containers/installations';
import { orange, lightBlue, blue } from '@material-ui/core/colors';
// import { getCookie } from './containers/cookieGetSet';
import { setToken } from './reducers/loginVRM';
import { setInstallations } from './reducers/installationsVRM';
import { MainMenu } from './components/mainMenu';
import Constructor from "./containers/constructor";
import { dashboardsSelector, loadDashboards } from './reducers/dashboards';
import Dashboard from './containers/dashboard';



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

// const Test = {
//   test: () => (
//     <div>Test of object component</div>
//   )
// };

class App extends React.Component{

  componentWillMount(){
    const rawloginVRM = localStorage.getItem("loginVRM");
    const rawInst = localStorage.getItem("installationsVRM");
    const rawDashboards = localStorage.getItem("dashboards");
    // console.log("component Will Mount. " , rawloginVRM);
    console.log("-- write to store from Local Storage --");
    if (rawloginVRM) this.props.setIsLogin(JSON.parse(rawloginVRM))   
    if (rawInst) this.props.setInst(JSON.parse(rawInst))
    if (rawDashboards) this.props.setDashboards(JSON.parse(rawDashboards))
  };

  render(){
    return(
      <ThemeProvider theme={mainTheme}>
      <div className="app">
        <h1>
          PV monitor
        </h1>
        <BrowserRouter basename="/application">
          <MainMenu
          dashboards={this.props.dashboards} />
        <Login />
            <Switch>
            <Route exact path="/" component={Installations} />
            <Route path="/sites" component={Installations} />
            {this.props.dashboards.map((dashboard, id) => {
              if (dashboard !== "") {
                return (
                  <Route path={`/dashboards/${id}`} component={Dashboard}/>
                )
              }
            })}
            <Route path="/newdashboard" component={Constructor} />
            <Route component={Page404} />
          </Switch>
        </BrowserRouter>
        {/* <Test.test /> */}
      </div>
      </ThemeProvider>
    )
  }
}

App.propTypes = {
  setIsLogin: PropTypes.func,
  setInst: PropTypes.func,
  dashboards: PropTypes.array,
  setDashboards: PropTypes.func,
};

const mapDispatchtoProps = {
  setIsLogin: setToken,
  setInst: setInstallations,
  setDashboards: loadDashboards,
};

const mapStateToProps = state => ({
  dashboards: dashboardsSelector(state),
});

export default connect(mapStateToProps, mapDispatchtoProps)(App);
