import React, { Component } from "react";
import App from "../App";
import './LoginStyle.css'

export default class Login extends Component {
  constructor(props) {
    super(props)
    if (this.props.newUserName === null) {
      this.state = {
        username: "",
        password: ""
      }
    } else {
      this.state = {
        username: this.props.newUserName,
        password: this.props.newPassword
      }
    }
  }

      

  // Update state whenever an input field is edited
  handleFieldChange = function(evt) {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  }.bind(this);

  // Handle for login submit
  handleLogin = function(e) {
    e.preventDefault();

    // Determine if a user already exists in API
    fetch(
      `http://localhost:8088/users?username=${this.state.username}&password=${this.state.password}`
    )
      .then(r => r.json())
      .then(user => {
        // User exists. Set local storage, and show home view
        if (user.length) {
          this.props.setActiveUser(user[0].id);
          this.props.showView("HomePage");

          // User doesn't exist
        } else {
          alert("User Name and Password Do Not Match Our Records.");
          // // Create user in API
          // fetch("http://localhost:8088/users", {
          //     method: "POST",
          //     headers: {
          //         "Content-Type": "application/json"
          //     },
          //     body: JSON.stringify({email: this.state.email, password: this.state.password})
          // })

          // // Set local storage with newly created user's id and show home view
          // .then(newUser => {
          //     this.props.setActiveUser(newUser.id)
          //     this.props.showView("home")
          // })
        }
      });
  }.bind(this);

  registerButtonClick = () => {
    this.props.showView("register");
  };

  /*
        TODO:
            - Add first name field
            - Add last name field
            - Add password verification field
    */
  render() {
    return (
      <div className="container is-fluid">
        <form className="container" onSubmit={this.handleLogin}>
          <h1 className="notification">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">
            User Name
          </label>
          <input
            onChange={this.handleFieldChange}
            defaultValue={this.props.newUserName}
            placeholder="User Name"
            type="username "
            id="username"
            className="form-control input is-normal"
            required=""
            autoFocus=""
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            onChange={this.handleFieldChange}
            type="password"
            id="password"
            className="form-control input is-normal"
            defaultValue={this.props.newPassword}
            placeholder="Password"
            required=""
          />
          
          <button className="button is-primary is-outlined" type="submit">
            Sign in
          </button>

          <button
            id="login__register"
            className="button is-primary is-outlined"
            onClick={this.registerButtonClick}
          >
            Register
          </button>
          <p className="">© 2017-2018</p>
        </form>
      </div>
    );
  }
}