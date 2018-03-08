import React from 'react';
import InputBox from './InputBox';

export default class SignupForm extends React.Component {

	render() {
			
	return(
		<div>
		<form>
			<InputBox
				id="userName"
				type="text"
				placeholder="Käyttäjätunnus" />
			<InputBox
				id="name"
				type="text"
				placeholder="Nimi" />
			<InputBox
				id="email"
				type="email"
				placeholder="Sähköpostiosoite" />
			<InputBox
				id="phone"
				type="text"
				placeholder="Puhelinnumero" />
			<InputBox
				id="password"
				type="password"
				placeholder="Salasana" />
			<InputBox
				id="password"
				type="password"
				placeholder="Vahvista salasana" />
			<button>Luo tili</button>
		</form>
		</div>
	)}
}