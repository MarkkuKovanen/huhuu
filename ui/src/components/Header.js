import {Link} from 'react-router-dom';
import React from 'react';
import '../style.css';
import logo from '../logo.svg';

export default class Header extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			usersPostList: [],
			uname: ""
		}
	}

	onChange = (event) => {
        this.setState({
            uname: event.target.value
		});
    }
	
	getUsersPostList = (event) => {
		event.preventDefault();
        let onGetUsersPostList = {
	    method:"GET",
	    headers:{"Content-Type":"application/json"}
	}
	fetch("/api/post/" + this.state.uname, onGetUsersPostList).then((response) => {
	    if (response.ok) {
		response.json().then((data) => {
		    this.setState({
			usersPostList:data
		    })
		console.log(data);
		})
	    } else {
		console.log(response.statusText);
	    }
	}).catch((error) => {
	    console.log(error);
	})
	
    }
    
    render() {
	return(
	    <header>
                <div class="logo">
                    <img src={logo} />
                    <h1>Huhuu</h1>
                </div>
		<form onSubmit={this.getUsersPostList}>		
		<input class="search"
			type="text"
			placeholder="Hae käyttäjän huhuilut"
			value={this.state.uname}
			onChange = {this.onChange}>
		</input>
		<input class="searchbutton" type="submit" value="Hae" />
		</form>
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
