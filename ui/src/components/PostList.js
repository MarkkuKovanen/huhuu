import React from 'react';
import {Link} from 'react-router-dom';
import {Item, Button, Confirm} from 'semantic-ui-react';

const prettyDate = require('pretty-date');

export default class PostList extends React.Component {
    state = {isConfirmOpen: false};
    
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

    showConfirm = () => this.setState({ isConfirmOpen: true })
    
    handleConfirm(id) {
        return (event) => {
            event.preventDefault();
            this.setState({ isConfirmOpen: false });

            let onDeletePost = {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                credentials: "same-origin",
            };
            fetch("/api/post/" + id, onDeletePost).then((response) => {
                if (response.ok) {
                    this.loadPostList();
                } else {
                    console.log(response.statusText);
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }

        
    handleCancel = () => this.setState({ isConfirmOpen: false })
    
    render () {
        if (!this.state.postList) {
            return (
                <div>Loading...</div>
            )
        } else {
            let posts = {}
            let fixModal = {
                marginTop: 0,
                marginLeft: "auto",
                marginRight: "auto"
            };
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
                            {this.props.user.id === post.user._id &&
                             <Item.Extra>
                                 <div>
                                     <Button onClick={this.showConfirm}
                                             floated="right"
                                             color="red"
                                             icon="remove"
                                             size="mini"/>
                                     <Confirm style={fixModal}
                                              open={this.state.isConfirmOpen}
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
                <Item.Group divided>
                    {posts}
                </Item.Group>
            )}
    }
}
