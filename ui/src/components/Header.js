import {Link} from 'react-router-dom';
import React from 'react';
import {Menu, Search, Form,} from 'semantic-ui-react';

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
 				<Form onSubmit = {this.onSubmit}>
 				    <Form.Group inline>
 					<Search noResultsDescription="No results should show up"
 					        type="text"
 					        placeholder="Hae käyttäjää"
 					        value={this.state.uname}
 					        onSearchChange = {this.onChange}>
 					</Search>
 					<Form.Button type="submit">Hae</Form.Button>
 				    </Form.Group>
 				</Form>
 			    </Menu.Item>
 	                </Menu>
                    </div>
 	        )
    }
}
