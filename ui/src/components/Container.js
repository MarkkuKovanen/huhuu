import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Header from './Header';
import SignupForm from './SignupForm';
import AddPost from './AddPost';
import Settings from './Settings';

export default class Container extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
	    postList: [],
            user: {}
        }
    }

    componentDidMount() {
        let loginStatus = localStorage.getItem("loginStatus");
        let sid = document.cookie;
        if (document.cookie) {
            let user = localStorage.getItem("user");
            if (user) {
                this.setState({
                    isLogged: true,
                    user: JSON.parse(user)
                });
            }
        }
	this.getPostList();
    }
	
    getPostList = () => {
	let onGetPostList = {
	    method:"GET",
	    headers:{"Content-Type":"application/json"}
	}
	fetch("/api/post", onGetPostList).then((response) => {
	    if (response.ok) {
		response.json().then((data) => {
		    this.setState({
			postList:data
		    })
		})
	    } else {
		console.log(response.statusText);
	    }
	}).catch((error) => {
	    console.log(error);
	})
    }
    
    onLogin = (user) => {
        let request = {
            method: "POST",
            credentials: 'same-origin',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }
        fetch("/api/login", request).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    localStorage.setItem("user", JSON.stringify(data));
                    this.setState({
                        isLogged: true,
                        user: data
                    });
                });
            }
        });
    }

    onLogout = () => {
        let request = {
            method: "POST",
            credentials: 'same-origin',
            headers: {"Content-Type": "application/json"}
        }
        fetch("/api/logout", request).then((response) => {
            if (response.ok) {
                localStorage.removeItem("user");
                this.setState({
                    isLogged: false,
                    user: {}
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
        fetch("/api/user", request).then((response) => {
            if (response.ok) {
                window.location.href = "/";
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
                                   <Main user={this.state.user} postList ={this.state.postList}/>
                               </div> :
                               <Redirect to="/login" />
                       }
                />
				<Route exact path="/settings"
						render = {
							() => this.state.isLogged ?
								<div>
									<Header onLogout={this.onLogout} />
									<Settings user ={this.state.user}/>
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
