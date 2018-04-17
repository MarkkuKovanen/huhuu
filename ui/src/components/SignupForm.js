import React from 'react';
import InputBox from './InputBox';

export default class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            email: "",
            phone: "",
            password: "",
            password2: "",
            usernameError: "",
            passwordError: ""
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
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: this.state.username,
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password
            })
        };
        fetch("/api/user", request).then((response) => {
            if (response.ok) {
                window.location.href = "/";
            } else if (response.status === 409) {
                this.setState({usernameError: "Käyttäjätunnus on varattu."});
            }
        });
        
    }
    
    render() {	
	return(
	    <div>
		<form class="register" onSubmit={this.onSubmit}>
		    <InputBox onChange={this.onChange}
		              name="username"
		              type="text"
		              label="Käyttäjätunnus"
                              error={this.state.usernameError} />
		    <InputBox onChange={this.onChange}
                              name="name"
                              type="text"
                              label="Nimi" />
		    <InputBox onChange={this.onChange}
		              name="email"
		              type="email"
		              label="Sähköpostiosoite" />
		    <InputBox onChange={this.onChange}
		              name="phone"
		              type="text"
		              label="Puhelinnumero" />
		    <InputBox onChange={this.onChange}
		              name="password"
		              type="password"
		              label="Salasana" />
		    <InputBox onChange={this.onChange}
		              name="password2"
		              type="password"
                              error={this.state.passwordError}
		              label="Vahvista salasana"
                    />
		    <input type="submit" value="Rekisteröi" />
                    <a href="/">Takaisin</a>
		</form>
	    </div>
	)
    }
}
