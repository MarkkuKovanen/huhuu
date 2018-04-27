import React from 'react';
import '../style.css';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
		};
    }
    
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onLogin({
            username: this.state.username,
            password: this.state.password
        });
    }

    onChange = (event) => {
        if (event.target.name === "username")
            this.setState({
                username: event.target.value
            });
        else if (event.target.name === "password")
            this.setState({
                password: event.target.value
            });
    }
	
	    
    render () {
        return (
            <div class="ui center aligned grid">
				<div class="column">
                <h1 class="ui header">Huhuu</h1>
				 <div class="ui stacked segment">
                <form class="ui large form" onSubmit={this.onSubmit}>
                    <input class="login"
                           placeholder="tunnus"
                           name="username"
                           type="text"
						   value={this.state.username}
                           required
                           onChange={this.onChange} />
                    
                    <input class="login"
                           placeholder="salasana"
                           name="password"
                           type="password"
						   value={this.state.password}
                           required
                           onChange={this.onChange} />
                    
                    <input class="login"
                           type="submit"
                           value="Kirjaudu" />
                    <a href="/register">Rekisteröi uusi käyttäjä</a>
                </form>
				</div>
				</div>
            </div>
        )
    }
}
