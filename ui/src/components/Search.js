import React from 'react';
import Modal from './Modal';
import PostList from './PostList';

export default class Search extends React.Component {

	constructor (props) {
		super(props);
		this.state = {
			usersPostList: [],
			uname: "",
			isOpen: false,
		}
	}
	
	toggleModal = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
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
	    headers:{"Content-Type":"application/json"},
		credentials: "same-origin"
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
			<div>
				<form onSubmit={this.getUsersPostList}>		
					<input class="search"
						type="text"
						placeholder="Hae käyttäjän huhuilut"
						value={this.state.uname}
						onChange = {this.onChange}>
					</input>
					<input class="searchbutton" type="submit" value="Hae" onClick={this.toggleModal}/>
				</form>
			<Modal show={this.state.isOpen}
					onClose={this.toggleModal}>
					<PostList class="postlist" postList={this.state.usersPostList} />
			</Modal>	
				
			</div>
		)
	}
}
	