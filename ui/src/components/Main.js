import React from "react";
import { Grid, Divider, Container } from "semantic-ui-react";
import AddPost from "./AddPost";
import PostList from "./PostList";
import UserInfo from "./UserInfo";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: null
        };
    }

    loadPostList() {
        let query = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        };
        let url = "/api/post/";
        if (!this.state.feed) {
            url += this.state.username;
        }
        fetch(url, query)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        this.setState({
                            postList: data
                        });
                    });
                } else {
                    console.log(response.statusText);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            nextProps.username !== prevState.username ||
            nextProps.feed !== prevState.feed
        ) {
            return {
                username: nextProps.username,
                feed: nextProps.feed,
                postList: null
            };
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

    onNewPost = post => {
        this.loadPostList();
    };

    render() {
        let newPost = "";
        if (this.props.user.username === this.props.username) {
            newPost = <AddPost onNewPost={this.onNewPost} />;
        }
        return (
            <Container>
                <Divider />
                <Grid columns="2" stackable>
                    <Grid.Column width="4">
                        <UserInfo username={this.props.username} />
                    </Grid.Column>
                    <Grid.Column width="12">
                        {newPost}
                        <Divider />
                        <PostList
                            postList={this.state.postList}
                            user={this.props.user}
                        />
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}
