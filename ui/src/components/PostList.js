import React from 'react';
import Post from './Post';
import {Item} from 'semantic-ui-react';
const prettyDate = require('pretty-date');

export default class PostList extends React.Component {

    render () {
	
        let posts = {}
        if (this.props.postList.length === 0) {
	    posts = <p>No posts to show</p>
	} else {
	    posts = this.props.postList.map((post) =>
		<Item>
                    <Item.Image size="mini" src={"/api/user/" + post.user._id + "/picture"} />
                    <Item.Content>
                        <Item.Header>{post.user.username}</Item.Header>
                        <Item.Meta>
                            {prettyDate.format(new Date(post.created))}
                        </Item.Meta>
                        <Item.Description>{post.message}</Item.Description>
                    </Item.Content>
		</Item>
	    )
        }
        
        return(
	    <Item.Group>
	        {posts}
	    </Item.Group>
        )}
}
