import React from 'react';
import {Form, Container} from 'semantic-ui-react';

export default class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            email: "",
            phone: "",
	    introduction: "",
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
		introduction: this.state.introduction,
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
	    <Container text>
                <h1>Rekisteröi uusi käyttäjä</h1>
	        <Form onSubmit={this.onSubmit}>
                    <Form.Input onChange={this.onChange}
	                        name="username"
	                        type="text"
                                label="Käyttäjätunnus"
                                required
	                        value={this.state.username} />
                    <Form.Input onChange={this.onChange}
	                        name="name"
	                        type="text"
                                label="Nimi"
                                required
	                        value={this.state.name} />
                    <Form.Input onChange={this.onChange}
	                        name="email"
	                        type="email"
                                label="Sähköpostiosoite"
                                required
	                        value={this.state.email} />
	            <Form.Input onChange={this.onChange}
	                        name="phone"
	                        type="text"
                                label="Puhelinnumero"
                                required
	                        value={this.state.phone} />
	            <Form.TextArea onChange={this.onChange}
	                           name="introduction"
                                   label="Lyhyt esittely itsestäsi"
	                           value={this.state.introduction} />
                    <Form.Input onChange={this.onChange}
	                        name="password"
	                        type="password"
                                label="Salasana"
                                required
	                        value={this.state.password} />
                    <Form.Input onChange={this.onChange}
	                        name="password2"
	                        type="password"
                                label="Toista salasana"
                                required
	                        value={this.state.password2} />
	            <Form.Button color="green" type="submit" inline>Lähetä</Form.Button>
	            <Form.Button color="red" onClick={() => {window.location.href = "/"}}>
                        Takaisin
                    </Form.Button>
                </Form>
	    </Container>
	)
            }
}
