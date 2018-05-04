import React from 'react';
import {Grid, Divider, Container} from 'semantic-ui-react';
import AddPost from './AddPost';
import PostList from './PostList';
import UserInfo from './UserInfo';

export default class Main extends React.Component {
    
    render () {
        let newPost = "";
        if (this.props.user.username === this.props.username) {
            newPost = <AddPost />
        }
        return (
            <Container>
                <Divider/>
                <Grid columns="2" stackable>
                    <Grid.Column width="4">
                        <UserInfo username={this.props.username} />
                    </Grid.Column>
                    <Grid.Column width="12">
                        {newPost}
                        <PostList username={this.props.username} feed={this.props.feed} />
                    </Grid.Column>
                </Grid>
	    </Container>
        )
    }
}

