import React from 'react';
import {Grid, Menu, Card, Image} from 'semantic-ui-react';
import AddPost from './AddPost';
import PostList from './PostList';
import UserInfo from './UserInfo';

export default class Main extends React.Component {

    render () {
        return (
            <div>
                <Grid columns="2" stackable>
                    <Grid.Column width="4">
                        <UserInfo user={this.props.user} />
                    </Grid.Column>
                    <Grid.Column width="12">
                        <AddPost />
                        <PostList postList={this.props.postList} 
								getPostList={this.props.getPostList}
								deletePost={this.props.deletePost}
								user={this.props.user}/>
                    </Grid.Column>
                </Grid>
	    </div>
        )
    }
}
