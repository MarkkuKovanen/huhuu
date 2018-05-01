import React from 'react';
import {Card, Image} from 'semantic-ui-react';
import avatar from '../avatar.jpg';

export default class UserInfo extends React.Component {
    
    render () {
       
        let picture = "/api/user/" + this.props.user.id + "/picture";
        return (
            <Card>
                <Image src={picture} />
                <Card.Content>
                    <Card.Header>
                        {this.props.user.name}
                    </Card.Header>
                    <Card.Description>
                        {this.props.user.introduction}
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}
