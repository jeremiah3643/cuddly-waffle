import React, { Component } from "react";
import register from './register.css';

function validate(email, password) {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0,
    password: password.length === 0,
  };
}


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",

      password: "",
      username: "",
      email: ""
    };
 

    this.firstnameChange = this.firstnameChange.bind(this);
    this.lastnameChange = this.lastnameChange.bind(this);

    this.passwordChange = this.passwordChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 

  firstnameChange(event) {
    this.setState({ firstname: event.target.value });
  }

  lastnameChange(event) {
    this.setState({ lastname: event.target.value });
  }
  emailChange(event) {
    this.setState({ email: event.target.value });
  }

  usernameChange(event) {
    this.setState({ username: event.target.value });
  }




  passwordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
     
    
    const { email, password } = this.state;
    alert("You Have Successfully , Please Log In");
  
    // Prevent form from clearing every time submitted
    event.preventDefault();

    // Store submitted values into variables
    const submittedFirstname = this.state.firstname;
    const submittedLastname = this.state.lastname;
    const submittedEmail = this.state.email;
    const submittedPassword = this.state.password;
    const submittedUsername = this.state.username;


    fetch(`http://localhost:8088/users?username=${submittedUsername}`)
      // Must be explicit on how to parse the response
      .then(r => r.json())

      // JSON parsed data comes to this then()
      .then(user => {
        // Convert user to string to get undefined if empty (instead of empty array)
        if (user.toString()) {
          alert("User Name Already In Use")

          // if doesn't exist, add to user db and forward to login page, passing email/password
        }
        else if (this.state === null) {
          alert("Please fill out remaining boxes.")
        }


        else {
          fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              first: submittedFirstname,
              last: submittedLastname,
              email: submittedEmail,
              password: submittedPassword,
              username: submittedUsername,

            })
          });
          this.props.setUsernamePassword(submittedUsername, submittedPassword)
          this.setState({
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            username: '',

          });
          this.props.showView("login")
        }
      });
  }

  


  render() {

    return (
      <div className="field level" id="registerdiv">
        {/* <h1>Sign-up to use our app below!</h1> */}
        <form onSubmit={this.handleSubmit} className="control">
          <h1 className="h3 mb-3 font-weight-normal">Register to use Bandspace:</h1>

          <input className="input"
            placeholder="First Name"
            type="text"
            value={this.state.firstname}
            onChange={this.firstnameChange}
          />
          <input className="input"
            type="text"
            placeholder="Last name"
            value={this.state.lastname}
            onChange={this.lastnameChange}
          />
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input  className="input" type="email" placeholder="Email"
                value={this.state.email}
                onChange={this.emailChange} />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input value={this.state.password}
                onChange={this.passwordChange}
                className="input" type="password" placeholder="Password" />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <input className="input"
            type="text"
            placeholder="User Name"
            value={this.state.username}
            onChange={this.usernameChange}
          />

          <button  type="submit" text="Submit" className="button is-primary">
            Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
