import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Header from './Header';
import SignupForm from './SignupForm';

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
            }
        });
    }

    onRegister = (user) => {
        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        };
        console.log(user);
        fetch("/api/user", request).then((response) => {
            if (response.ok) {
                this.props.history.push("/login"); //not working
            } else {
                console.log(response.status.text);
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
                <Route exact path="/register"
                       render = {
                           () =>
                               <SignupForm onRegister={this.onRegister} />
                       }
                />
            </Switch>
	)
    }
}
