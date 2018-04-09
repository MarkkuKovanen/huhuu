import {Link} from 'react-router-dom';
import React from 'react';
import './styles/Header.css';
import logo from '../logo.svg';

export default class Header extends React.Component{

    constructor(props) {
        super(props);
    }
    
    render() {
	return(
	    <header>
                <div class="logo">
                    <img src={logo} />
                    <h1>Huhuu</h1>
                </div>
		<ul class="menu">
		    <li class="menu">
                        <Link to="/">Etusivu</Link>
                    </li>
		    <li class="menu">
                        <Link to="/settings">Asetukset</Link>
                    </li>
		    <li class="menu">
                        <Link to="/"
                              onClick={this.props.onLogout}>
                            Kirjaudu ulos
                        </Link>
                    </li>
		</ul>
	    </header>
	)
    }
}
