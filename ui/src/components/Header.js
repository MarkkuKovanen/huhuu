import {Link} from 'react-router-dom';
import React from 'react';
import './styles/Header.css';

export default class Header extends React.Component{

	render(){
		return(
			<div className='rows'>
				<ul>
					<li className='row'><Link to= "/" style={{ textDecoration:'none' }}>Etusivu</Link></li>
					<li className='row'><Link to = "/settings" style={{ textDecoration:'none' }}>Asetukset</Link></li>
					<li className='row'><Link to = "/" style={{ textDecoration:'none' }}>Kirjaudu ulos</Link></li>
				</ul>
			</div>
	)}
}