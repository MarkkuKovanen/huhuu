import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Header from './Header';
import SignupForm from './SignupForm';
import Settings from './Settings';
import {Container} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';

class Cont extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            user: undefined,
        }
    }

    componentDidMount() {
        if (document.cookie) {
            let user = localStorage.getItem("user");
            if (user) {
                this.setState({
                    isLogged: true,
                    user: JSON.parse(user),
                });
            }
        }
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
                this.props.history.push("/");
            } else {
                console.log(response.status.text);
            }
        });
    }

    getSearchedUser = (uname) => {
        this.props.history.push("/user/" + uname);
    }

    mainRoute = ({match}) => {
        if (match.params.username) {
            return (
                <Main user={this.state.user}
                      username={match.params.username}
                      deletePost={this.deletePost}
                />
            );
        } else {
            return (
                <Main user={this.state.user}
                      username={this.state.user.username}
                      deletePost={this.deletePost}
                      feed
                />
            );
        }
    }

    render() {
	      return(
            <Switch>
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

                <Route path="/"
                       render = {
                           () => this.state.isLogged ?
                               <Container fluid>
                                   <Header onLogout={this.onLogout}
				                                   getSearchedUser={this.getSearchedUser}
                                   />

                                   <Switch>
                                       <Route exact path="/settings" render={() =>
                                           <Settings user={this.state.user}/>
                                       } />
                                       <Route exact path="/user/:username" render={this.mainRoute} />
                                       <Route exact path="/" render={this.mainRoute} />
                                   </Switch>
                               </Container> :
                               <Redirect to="/login" />
                       }
                />
            </Switch>
	      )
    }
}

export default withRouter(Cont);
