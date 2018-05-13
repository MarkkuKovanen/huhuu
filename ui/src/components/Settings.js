import React from 'react';
import Upload from './Upload';
import {Container, Form, Button, Confirm} from 'semantic-ui-react';

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
            password2: "",
			open: false
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
	
	showConfirm=() => this.setState({ open: true })
	
	handleConfirm(id) {
		return (event) => {
			event.preventDefault();
			this.setState({ open: false });
			this.deleteUser(id);
		}
	}
		
	handleCancel = () => this.setState({ open: false })
	
	deleteUser = (id) => {
		let onDeleteUser = {
            method: "DELETE",
			headers: {"Content-Type": "application/json"},
			credentials: "include",
        };
        fetch("/api/user/" + id, onDeleteUser).then((response) => {
            if (response.ok) {
				localStorage.removeItem("user");
				window.location.href = "/login";
            } else {
			console.log(response.statusText);
			}
			}).catch((error) => {
			console.log(error);
			})
	}
    
    render() {

		
		let fixModal = {
            marginTop: "50px",
            marginLeft: "auto",
            marginRight: "auto"
        };
	return(
	    <Container text>
			    <h1>Asetukset</h1>
          <Upload user={this.props.user} trigger={<Button>Vaihda profiilikuvaa</Button>} />
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
				      <Form.Button onClick={this.showConfirm}
							    color="red">Poista tili</Form.Button>
				      <Confirm style={fixModal}
							open={this.state.open}
							onCancel={this.handleCancel}
							onConfirm={this.handleConfirm(this.props.user.id)} 
							header="Olet poistamassa käyttäjätilisi lopullisesti"
							content="Oletko varma?"
							size="small"/>
				      <Form.Button color="green" type="submit">Päivitä tiedot</Form.Button>
			        <br/>
              <a href="/">Takaisin</a>
		      </Form>
		  </Container>    
	)}
}
