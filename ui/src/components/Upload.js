import React from 'react';
import {Form, Modal, Image} from 'semantic-ui-react';

export default class Upload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            pic: "/api/user/" + this.props.user.id + "/picture",
            open: this.props.open
        }
    }
    
    upload = () => {       
        if (this.state.file) {
            let formData = new FormData();
            formData.append('photo', this.state.file);
            let request = {
                method: "PUT",
                credentials: "same-origin",
                body: formData
            };
            fetch("/api/user/" + this.props.user.id + "/picture", request).then((response) => {
                if (response.ok) {
                    this.setState({
                        pic: "/api/user/" + this.props.user.id + "/picture",
                        open: false
                    });
                }
            });
        }
    }

    fileSelected = (event) => { 
        this.setState({
            file: event.target.files[0]
        });
    }
    
    render() {
        let fixModal = {
            marginTop: 0,
            marginLeft: "auto",
            marginRight: "auto"
        };
        return (

            <Modal style={fixModal}
                   trigger={this.props.trigger}
                   open={this.state.open}
                   closeIcon>
                <Modal.Header>Valitse profiilikuva</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src={this.state.pic} />
                    <Modal.Description>
                        <Form onSubmit={this.upload}>
                            <Form.Field>
                                <label>Valitse kuva</label>
                                <input type="file"
                                       name="file"
                                       onChange={this.fileSelected} />
                            </Form.Field>
                            <Form.Button content="Lähetä" />
                        </Form>    
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}
