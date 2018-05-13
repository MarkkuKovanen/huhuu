import React from 'react';
import {Container, Form} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

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
            <Container text textAlign="center">

                <h1>Huhuu</h1>

                <Form size="large" onSubmit={this.onSubmit}>
                    <Form.Input placeholder="tunnus"
                                name="username"
                                type="text"
			        value={this.state.username}
                                required
                                onChange={this.onChange} />
                    
                    <Form.Input placeholder="salasana"
                                name="password"
                                type="password"
			        value={this.state.password}
                                required
                                onChange={this.onChange} />
                    
                    <Form.Button type="submit">
                        Kirjaudu
                    </Form.Button>
                    <Link to="/register">Rekisteröi uusi käyttäjä</Link>
                </Form>
				<br/>
				<a target="_blank" href="https://github.com/MarkkuKovanen/huhuu">About Huhuu</a>
            </Container>
        )
    }
}
