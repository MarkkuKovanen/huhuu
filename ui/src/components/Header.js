import {Link} from 'react-router-dom';
import React from 'react';
import {Menu, Image, Container, Search} from 'semantic-ui-react';

import logo from '../logo.svg';

export default class Header extends React.Component{

	constructor(props) {
		super(props);
	}

	    
    render() {
	return(
	    <Menu inverted>
                
                <Menu.Item>
                    <Link to="/">
                        <h1>Huhuu</h1>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/settings">Asetukset</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link to="/" onClick={this.props.onLogout}>
                        Kirjaudu ulos
                    </Link>
                </Menu.Item>
                <Menu.Item position="right">
                    <Search>
                    </Search>
                </Menu.Item>
	    </Menu>
	)
    }
}
