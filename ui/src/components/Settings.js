import React from 'react';
import Upload from './Upload';
import {Container, Form, Button, Message} from 'semantic-ui-react';

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
        fetch("/api/user/" + this.props.user.id, request).then((response) => {
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
	    <Container text>
			<h1>Asetukset</h1>
			<Form onSubmit={this.onSubmit}>
			    <Form.Input onChange={this.onChange}
			        name="username"
			        type="text"
			        value={this.state.username}
					label="Käyttäjätunnus"
					required
					error={this.state.usernameError} />
			    <Form.Input onChange={this.onChange}
			        name="name"
			        type="text"
			        value={this.state.name}
					label="Nimi"
			        required />
                <Form.Input onChange={this.onChange}
			        name="email"
			        type="email"
			        value={this.state.email}
					label="Sähköpostiosoite"
			        required />
			    <Form.Input onChange={this.onChange}
			        name="phone"
			        type="text"
			        value={this.state.phone}
					label="Puhelinnumero"
			        required />
			    <Form.Field>
				<Upload user={this.props.user} trigger={<Button>Vaihda profiilikuvaa</Button>} />
				</Form.Field>
				<Form.TextArea onChange={this.onChange}
			        name="introduction"
			        type="text"
			        value={this.state.introduction}
					label="Kirjoita itsestäsi lyhyt esittely"
			        />
				<Form.Input onChange={this.onChange}
			        name="password"
			        type="password"
			        value={this.state.password}
					label="Salasana"
			        required />
			    <Form.Input onChange={this.onChange}
			           label="Vahvista salasana"
					   name="password2"
			           type="password"
			           value={this.state.password2}
			           error={this.state.passwordError}
					   required />
				<Form.Button color="green" type="submit">Päivitä tiedot</Form.Button>
			    <br/>
                <a href="/">Takaisin</a>
		    </Form>
		</Container>    
	)}
}
