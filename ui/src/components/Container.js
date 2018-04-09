import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Card from './Card';
import Login from './Login';

export default class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false
        }
    }

    componentDidMount() {
        let loginStatus = localStorage.getItem("loginStatus");
        if (loginStatus === null) {
            localStorage.setItem("loginStatus", "not logged");
        } else if (loginStatus === 'logged') {
            this.setState({
                isLogged: true
            });
        }
    }
    
    onLogin = (user) => {
        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }
        fetch("/api/login", request).then((response) => {
            if (response.ok) {
                this.setState({isLogged: true});
                localStorage.setItem("loginStatus", "logged");
            }
        });
    }

    onLogout = () => {
        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"}
        }
        console.log("onLogout");
        fetch("/api/logout", request).then((response) => {
            if (response.ok) {
                localStorage.setItem("loginStatus", "not logged");
                this.setState({
                    isLogged: false
                });
                //this.transitionTo("/login");
            }
        });
    }
    
    render() {
	return(
            <Switch>
                <Route exact path="/"
                       render = {
                           () => this.state.isLogged ?
                               <div>
                                   <Header onLogout={this.onLogout} />
                                   <Main />
                               </div> :
                               <Redirect to="/login" />
                       }
                />
                <Route exact path="/login"
                       render = {
                           () => this.state.isLogged ?
                               <Redirect to="/" /> :
                               <Login onLogin={this.onLogin} />
                       }
                />
            </Switch>
	)
    }
}
