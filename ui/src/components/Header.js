import {Link} from 'react-router-dom';
import React from 'react';
import {Menu, Image, Container, Search, Modal, Grid} from 'semantic-ui-react';
import logo from '../logo.svg';
import PostList from './PostList';
import UserInfo from './UserInfo';


export default class Header extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			usersPostList: [],
			searchedUser: {},
			uname: ""
		};
	
	}

	onChange = (event) => {
        this.setState({
            uname: event.target.value
		});
    }
	
		
	onSubmit = (event) => {
		event.preventDefault();
		this.props.getUsersPostList(this.state.uname);
		this.props.getSearchedUser(this.state.uname);
	}
	
    render() {
		return(
			<div>
				<Menu inverted>
                <Menu.Item>
                    <Link to="/">
                        <h1>Huhuu</h1>
                    </Link>
                </Menu.Item>
				<Menu.Item>
                    <Link to="/" onClick={this.props.onLogin}>
                        Etusivu
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
					<form onSubmit = {this.onSubmit}>
						<Search
							type="text"
							placeholder="Hae käyttäjää"
							value={this.state.uname}
							onSearchChange = {this.onChange}>
						</Search>
						<input type="submit" value="Hae"/>
					</form>
				</Menu.Item>
	    </Menu>
      </div>
	)
    }
}
