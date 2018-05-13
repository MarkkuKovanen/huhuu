import React from "react";
import { Link } from "react-router-dom";
import { Item, Button, Confirm, Label, Icon, Popup } from "semantic-ui-react";

const prettyDate = require("pretty-date");

export default class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: props.postList,
            isConfirmOpen: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.postList !== prevState.postList) {
            return {
                postList: nextProps.postList,
                isConfirmOpen: prevState.isConfirmOpen
            };
        } else {
            return null;
        }
    }

    showConfirm = id => {
        return () => {
            this.setState({
                isConfirmOpen: true,
                selectedPost: id
            });
        };
    };

    handleConfirm = event => {
        event.preventDefault();
        let onDeletePost = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        };
        fetch("/api/post/" + this.state.selectedPost, onDeletePost)
            .then(response => {
                if (response.ok) {
                    this.setState({
                        postList: this.state.postList.filter(
                            post => post._id !== this.state.selectedPost
                        )
                    });
                    this.setState({ isConfirmOpen: false });
                } else {
                    console.log(response.statusText);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleCancel = () => this.setState({ isConfirmOpen: false });

    render() {
        if (!this.state.postList) {
            return <div>Loading...</div>;
        } else {
            let posts = {};
            let fixModal = {
                marginTop: 0,
                marginLeft: "auto",
                marginRight: "auto"
            };
            if (this.state.postList.length === 0) {
                posts = <p>No posts to show</p>;
            } else {
                posts = this.state.postList.map(post => (
                    <Item key={post._id}>
                        <Item.Image
                            size="mini"
                            src={"/api/user/" + post.user._id + "/picture"}
                        />
                        <Item.Content>
                            <Item.Header>
                                <Link to={"/user/" + post.user.username}>
                                    {post.user.username}
                                </Link>
                            </Item.Header>
                            <Item.Meta>
                                {prettyDate.format(new Date(post.created))}
                            </Item.Meta>
                            <Item.Description>{post.message}</Item.Description>
                            <Item.Extra>
                                <Popup
                                    trigger={
                                        <Icon
                                            circular
                                            name="like"
                                            color="red"
                                            floated="left"
                                        />
                                    }
                                >
                                    Tykkää(Ei toiminnallisuutta)
                                </Popup>
                                <Label pointing="left">
                                    15 käyttäjää tykkää tästä
                                </Label>
                                {this.props.user.id === post.user._id && (
                                    <div>
                                        <Button
                                            onClick={this.showConfirm(post._id)}
                                            floated="right"
                                            color="red"
                                            icon="remove"
                                            size="mini"
                                        />
                                    </div>
                                )}
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ));
            }
            return (
                <div>
                    <Confirm
                        style={fixModal}
                        open={this.state.isConfirmOpen}
                        onCancel={this.handleCancel}
                        onConfirm={this.handleConfirm}
                        header="Olet poistamassa tämän huhuilun"
                        content="Oletko varma?"
                        size="small"
                    />
                    <Item.Group divided>{posts}</Item.Group>
                </div>
            );
        }
    }
}
