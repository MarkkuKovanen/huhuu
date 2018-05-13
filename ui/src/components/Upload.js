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
        this.reader = new FileReader();
        this.reader.addEventListener("load", () => {
            console.log(this.reader.readyState);
            this.setState({
                pic: this.reader.result
            });
        }, false);
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
                    window.location.reload(); //TODO: find a better way to update the profile picture.
                }
            });
        }
    }

    fileSelected = (event) => {
        this.reader.readAsDataURL(event.target.files[0]);
        this.setState({
            file: event.target.files[0],
        });
    }

    render() {
        let fixModal = {
            marginTop: "50px",
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
                                       accept="image/*"
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
