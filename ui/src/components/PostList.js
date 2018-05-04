import React from 'react';
import {Item, Button, Confirm, Icon} from 'semantic-ui-react';
const prettyDate = require('pretty-date');

export default class PostList extends React.Component {

	state = {open: false}
	
	show=() => this.setState({ open: true })
	
	handleConfirm(id) {
		return (event) => {
			event.preventDefault();
			this.setState({ open: false });
			this.props.deletePost(id);
		}
	}
	
	handleCancel = () => this.setState({ open: false })

	render () {
	
		let fixModal = {
            marginTop: 0,
            marginLeft: "auto",
            marginRight: "auto"
        };
		
		let posts = {}
        if (this.props.postList.length === 0) {
	    posts = <p>No posts to show</p>
		} else {
	    posts = this.props.postList.reverse().map((post) =>
			<Item>
                    <Item.Image size="mini" src={"/api/user/" + post.user._id + "/picture"} />
                    <Item.Content>
                        <Item.Header>{post.user.username}</Item.Header>
                        <Item.Meta>
                            {prettyDate.format(new Date(post.created))}
                        </Item.Meta>
                        <Item.Description>{post.message}</Item.Description>
						{this.props.user.id === post.user._id &&
						<Item.Extra>
							<div>
							<Button 
									onClick={this.show}
									floated="right"
									color="red"
									icon="remove"
									size="mini"/>
							<Confirm style={fixModal}
								open={this.state.open}
								onCancel={this.handleCancel}
								onConfirm={this.handleConfirm(post._id)} 
								header="Olet poistamassa tämän huhuilun"
								content="Oletko varma?"
								size="small"/>
							</div>
						</Item.Extra>
						}
                    </Item.Content>
			</Item>
	    )
        }
        
        return(
	    <Item.Group divided="true">
	        {posts}
	    </Item.Group>
        )}
}
