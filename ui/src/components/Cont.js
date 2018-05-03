import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Header from './Header';
import SignupForm from './SignupForm';
import Settings from './Settings';
import { Container, Menu } from 'semantic-ui-react';

export default class Cont extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
	    postList: [],
            user: {},
	    usersPostList: [],
	    displayedUser: {}
        }
    }

    componentDidMount() {
        if (document.cookie) {
            let user = localStorage.getItem("user");
            if (user) {
                this.setState({
                    isLogged: true,
                    user: JSON.parse(user),
                    displayedUser: JSON.parse(user)
                });
                console.log(user);
                this.getPostList();
            }
        }
    }
	
    getPostList = () => {
	let onGetPostList = {
	    method:"GET",
            credentials: 'same-origin',
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
                        user: data,
			displayedUser: data
                    });
                    this.getPostList();
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
	
    getUsersPostList = (uname) => {
	let onGetUsersPostList = {
	    method:"GET",
	    headers:{"Content-Type":"application/json"},
	    credentials: "same-origin"
	}
	fetch("/api/post/" + uname, onGetUsersPostList).then((response) => {
	    if (response.ok) {
		response.json().then((data) => {
		    this.setState({
			postList:data
			})
		console.log(data);
		})
	    } else {
		console.log(response.statusText);
	    }
	}).catch((error) => {
	    console.log(error);
	})
	}
	
	
	getSearchedUser = (uname) => {
		let onGetSearchedUser = {
	    method:"GET",
	    headers:{"Content-Type":"application/json"},
		credentials: "same-origin"
	}
	fetch("/api/user/" + uname, onGetSearchedUser).then((response) => {
	    if (response.ok) {
		response.json().then((data) => {
		    this.setState({
			displayedUser:data
			})
		console.log(data);
		})
	    } else {
		console.log(response.statusText);
	    }
	}).catch((error) => {
	    console.log(error);
	})
	}
	
    render() {
	return(
            <Switch>
                <Route exact path="/"
                       render = {
                           () => this.state.isLogged ?
                               <div>
                                   <Header onLogout={this.onLogout}
				           onLogin={this.onLogin}
				           getSearchedUser={this.getSearchedUser} 
				           getUsersPostList={this.getUsersPostList}/>
                                   <Main user={this.state.displayedUser}
                                         postList ={this.state.postList}/>
                               </div>:
                               
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
