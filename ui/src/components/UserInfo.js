import React from 'react';
import {Card, Image} from 'semantic-ui-react';
import avatar from '../avatar.jpg';

export default class UserInfo extends React.Component {
    
    render () {
        let photo = this.props.user.photo;
        if (!photo) photo = avatar;
        console.log("userinfo photo:");
        console.log(photo);
        return (
            <Card>
                <Image src={photo} />
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
