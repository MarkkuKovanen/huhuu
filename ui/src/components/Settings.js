import React from 'react';
import Upload from './Upload';
import {Button} from 'semantic-ui-react';

export default class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.username,
            name: this.props.user.name,
            phone: this.props.user.phone,
            email: this.props.user.email,
            introduction: this.props.user.introduction,
            password: "",
            password2: ""
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({ passwordError: "", usernameError: "" });
        if (this.state.password !== this.state.password2) {
            this.setState({ passwordError: "Salasanat eivät täsmää." });
            return;
        }
        let request = {
            method: "PUT",
	    headers: {"Content-Type": "application/json"},
	    credentials: "same-origin",
            body: JSON.stringify({
                username: this.state.username,
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
		introduction: this.state.introduction,
                password: this.state.password
            })
        };
        fetch("/api/user/" + this.props.user.username, request).then((response) => {
            if (response.ok) {
                window.location.href = "/settings";
            } else if (response.status === 409) {
                this.setState({usernameError: "Käyttäjätunnus on varattu."});
            }
        });
    }
    
    render() {
        console.log(this.props.user);
	return(
	    <div class="ui center aligned grid">
		<div class="column">
                    <h1 class="ui header">Huhuu</h1>
		    <div class="ui stacked segment">
                        <Upload user={this.props.user} trigger={<Button>Muokkaa profiilikuvaa</Button>} />
			<form class="ui large form" onSubmit={this.onSubmit}>
			    <label>Käyttäjätunnus</label>
			    <input onChange={this.onChange}
			           name="username"
			           type="text"
			           value={this.state.username}
			           required
                                   error={this.state.usernameError} />
			    <label>Nimi</label>
			    <input onChange={this.onChange}
			           name="name"
			           type="text"
			           value={this.state.name}
			           required />
                            <label>Sähköpostiosoite</label>
			    <input onChange={this.onChange}
			           name="email"
			           type="email"
			           value={this.state.email}
			           required />
			    <label>Puhelinnumero</label>
			    <input onChange={this.onChange}
			           name="phone"
			           type="text"
			           value={this.state.phone}
			           required />
			    <label>Kirjoita itsestäsi lyhyt esittely</label>
			    <input onChange={this.onChange}
			           name="introduction"
			           type="text"
			           value={this.state.introduction}
			           required />
			    <label>Salasana</label>
			    <input onChange={this.onChange}
			           name="password"
			           type="password"
			           value={this.state.password}
			           required />
			    <label>Vahvista salasana</label>
			    <input onChange={this.onChange}
			           name="password"
			           type="password"
			           value={this.state.password2}
			           error={this.state.passwordError}
			           required />
		    	    <input type="submit" value="Päivitä tiedot" />
			    <br/>
                            <a href="/">Takaisin</a>
		        </form>
		    </div>
		</div>
	    </div>
	)
    }
}
