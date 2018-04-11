import React from 'react';

export default class SignupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "username": "",
            "name": "",
            "email": "",
            "phone": "",
            "password": "",
            "password2": ""
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(this.state);
    }

    onSubmit = (event) => {
        event.preventDefault();
        
    }
    
    render() {	
	return(
	    <div>
		<form class="register" onSubmit={this.onSubmit}>
		    <input onChange={this.onChange}
		           name="username"
		           type="text"
		           placeholder="Käyttäjätunnus" />
		    <input onChange={this.onChange}
                           name="name"
                           type="text"
                           placeholder="Nimi" />
		    <input onChange={this.onChange}
		           name="email"
		           type="email"
		           placeholder="Sähköpostiosoite" />
		    <input onChange={this.onChange}
		           name="phone"
		           type="text"
		           placeholder="Puhelinnumero" />
		    <input onChange={this.onChange}
		           name="password"
		           type="password"
		           placeholder="Salasana" />
		    <input onChange={this.onChange}
		           name="password2"
		           type="password"
		           placeholder="Vahvista salasana" />
		    <input type="submit" value="Rekisteröi" />
                    <a href="/">Takaisin</a>
		</form>
	    </div>
	)
    }
}
