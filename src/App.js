
import './login/LoginStyle.css'
import React, { Component } from "react";
import "./App.css";
import NavBar from './nav/NavBar';
import Register from "./login/Register";
import Login from './login/Login';
import PopLog from './login/LoginPopup';
import HomePage from './home/HomePage';
import Forum from "./forum/Forum"

class App extends Component {
  // Set initial state
  // state = {
  //   currentView: "login",
  //   searchTerms: "",
  //   activeUser: sessionStorage.getItem("bandId"),
  //   newEmail: "",
  //   newPassword: ""
  // };

  // Search handler -> passed to NavBar
  
    // Set initial state
    state = {
        currentView: "login",
        searchTerms: "",
        activeUser: sessionStorage.getItem("bandId"),
        viewingUser: ""
    }

    performSearch = function(terms) {
      this.setState({
        searchTerms: terms,
        currentView: "results"
      });
    }.bind(this);

  // Set Username/password field to newly created username and password
  setUsernamePassword = function (newUsername, newPassword) {
    this.setState({
      newEmail: newUsername,
      newPassword: newPassword
    })  
    
  }.bind(this)

  // Function to update local storage and set activeUser state
  setActiveUser = val => {
    if (val) {
      sessionStorage.setItem("bandId", val);
      this.setState({
        activeUser: val
      })
    } else {
      sessionStorage.removeItem("bandId");
      this.setState({
        activeUser: null
      })
    }
  }

    
    setViewingUser = function (val) {
        this.setState({
            viewingUser: val
        })
    }.bind(this)


  // View switcher -> passed to NavBar and Login
  // Argument can be an event (via NavBar) or a string (via Login)
  showView = function(e) {
    let view = null;

    // Click event triggered switching view
    if (e.hasOwnProperty("target")) {
      view = e.target.id.split("__")[1];

      // View switch manually triggered by passing in string
    } else {
      view = e;
    }

    // If user clicked logout in nav, empty local storage and update activeUser state
    if (view === "logout") {
      this.setActiveUser(null);
    }

    // Update state to correct view will be rendered
    this.setState({
      currentView: view
    });
  }.bind(this);

  /*
        Function to determine which main view to render.
    */
  View = () => {
    if (this.state.currentView === "register") {
      return (
        <Register showView={this.showView} setActiveUser={this.setActiveUser} setUsernamePassword={this.setUsernamePassword}/>
      );
    } else if (sessionStorage.getItem("bandId") === null) {
      return (
        <Login showView={this.showView} setActiveUser={this.setActiveUser} newEmail={this.state.newEmail} newPassword={this.state.newPassword}/>
      );
    } else {
      switch (this.state.currentView) {

            case "HomePage":
            return (
              <HomePage id={sessionStorage.getItem("bandId")}/>
          );
          case "Forum":
          return (
            <Forum showView={this.showView} />
          )
      }
    }
  };

  render() {
    return (
      <article>
        <NavBar
          viewHandler={this.showView}
          searchHandler={this.performSearch}
          activeUser={this.state.activeUser}
          setActiveUser={this.setActiveUser}
        />

        {this.View()}
      </article>
    );
  }
}


export default App;

