import React from 'react';
import {Card, Image} from 'semantic-ui-react';

export default class UserInfo extends React.Component {
    state = {};
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.username !== prevState.username) {
            return {
                username: nextProps.username,
                user: null
            }
        } else {
            return null;
        }
    }

    componentDidMount() {
        this.loadUserData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.user === null) {
            this.loadUserData();
        }
    }
    
    loadUserData () {
        if (this.state.username) {
            let query = {
	        method:"GET",
	        headers:{"Content-Type":"application/json"},
		credentials: "same-origin"
	    }
	    fetch("/api/user/" + this.state.username, query).then((response) => {
	        if (response.ok) {
		    response.json().then((data) => {
                        this.setState({
                            user: data
                        });
		    })
	        } else {
		    console.log(response.statusText);
	        }
	    }).catch((error) => {
	        console.log(error);
	    })
        }
    }
    
    render () {
        if (!this.state.user) {
            return (
                <div>Loading...</div>
            )
        } else {
            let picture = "/api/user/" + this.state.user._id + "/picture";
            return (
                <Card>
                    <Image src={picture} />
                    <Card.Content>
                        <Card.Header>
                            {this.state.user.name}
                        </Card.Header>
                        <Card.Description>
                            {this.state.user.introduction}
                        </Card.Description>
                    </Card.Content>
                </Card>
            )
        }
    }
}
