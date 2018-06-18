import React, { Component } from "react";
import App from '../App';
import Login from '../login/Login';

export default class HomePage extends Component {
    constructor(props) {
        super(props)
        
        
    }

    state = {
        user: null
    }
    
    loaded = function(){
        if(this.state.user !== null){
            return <h2 className="welcomeTag">{`Welcome ${this.state.user.username}`}</h2>
        }
    }

    load = function(){
        if (this.props.setActiveUser === null) {
            this.setState = {
                currentView: "Login"
            }
        }
        else {
            sessionStorage.getItem("bandId")
            fetch(`http://localhost:8088/users/${this.props.id}`)
                .then(r => r.json()).then(response => {
                    this.setState({user: response})
                })
        
    
        // http://localhost:8088/users?username=${this.state.username}}
        }
    }.bind(this)

    componentDidMount(){
        this.load()
    }


render() {
    return (
        <div className="homeDiv">
            {this.loaded()}

        </div>
    )
}}

