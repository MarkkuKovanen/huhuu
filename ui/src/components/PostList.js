import React from 'react';
import {Item} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const prettyDate = require('pretty-date');

export default class PostList extends React.Component {

    state = {};
    
    loadPostList() {
        let query = {
	    method:"GET",
	    headers:{"Content-Type":"application/json"},
	    credentials: "same-origin"
	}
        let url = "/api/post/";
        if (!this.state.feed) {
            url += this.state.username;
        }
        fetch(url, query).then((response) => {
	    if (response.ok) {
		response.json().then((data) => {
                    this.setState({
		        postList: data
		    });
		})
	    } else {
		console.log(response.statusText);
	    }
	}).catch((error) => {
	    console.log(error);
	})
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.username !== prevState.username ||
            nextProps.feed !== prevState.feed) {
            return {
                username: nextProps.username,
                feed: nextProps.feed,
                postList: null,
            }
        } else {
            return null;
        }
    }

    componentDidMount() {
        this.loadPostList();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.postList === null) {
            this.loadPostList();
        }
    }
    
    render () {
        if (!this.state.postList) {
            return (
                <div>Loading...</div>
            )
        } else {
            let posts = {}
            if (this.state.postList.length === 0) {
	        posts = <p>No posts to show</p>
	    } else {
	        posts = this.state.postList.reverse().map((post) =>
		    <Item key={post._id}>
                        <Item.Image size="mini" src={"/api/user/" + post.user._id + "/picture"} />
                        <Item.Content>
                            <Item.Header>
                                <Link to={"/user/" + post.user.username}>{post.user.username}</Link>
                            </Item.Header>
                                <Item.Meta>
                                    {prettyDate.format(new Date(post.created))}
                                </Item.Meta>
                                <Item.Description>{post.message}</Item.Description>
                        </Item.Content>
		    </Item>
	        )
            }       
            return(
	        <Item.Group divided>
	            {posts}
	        </Item.Group>
            )}
    }
}
