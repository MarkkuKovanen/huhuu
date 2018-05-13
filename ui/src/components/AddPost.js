import React from "react";
import { Form } from "semantic-ui-react";

export default class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    onChange = (event, { name, value }) => {
        this.setState({
            [name]: value
        });
    };

    onSubmit = event => {
        event.preventDefault();
        let post = {
            message: this.state.message
        };
        let request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify(post)
        };

        fetch("/api/post", request).then(response => {
            if (response.ok) {
                this.props.onNewPost();
                this.setState({
                    message: ""
                });
            } else {
                console.log(response.status.text);
            }
        });
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.TextArea
                    name="message"
                    value={this.state.message}
                    onChange={this.onChange}
                    placeholder="Sano jotakin..."
                />
                <Form.Button content="Lähetä" />
            </Form>
        );
    }
}
