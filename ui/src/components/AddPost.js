import React from 'react';

export default class AddPost extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			"username":"",
			"photo":"",
			"message":"",
			"created":"",
			"modified":"",
			"image":""
		}	
	}
	
	onChange = (event) => {
        this.setState({
            message: event.target.value,
			created: Date.now()
        });
    }

    /* onSubmit = (event) => {
     *     event.preventDefault();
     *     
     *     let request = {
     *         method: "GET",
     *         credentials: 'include'
     *     };
     *     
     *     fetch("/us", request).then((response) => {
     *         if (response.ok) {
     *             console.log(this.props);
     *             //window.location.href = "/";
     *         } else {
     *             console.log(response.status.text);
     *         }
     *     });
     * }
     */
    
    onSubmit = (event) => {
        event.preventDefault();
        let post = {
            username: this.props.username,
            message: this.state.message,
        }
        let request = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: 'same-origin',
            body: JSON.stringify(post)
        };

        fetch("/api/post", request).then((response) => {
            if (response.ok) {
                console.log(this.props);
                //window.location.href = "/";
            } else {
                console.log(response.status.text);
            }
        });
    }
    
    render(){
	return(
	    <div>
		<form onSubmit={this.onSubmit}> 
		    <input type="text"
			value={this.state.message}
			placeholder="Sano jotakin"
			onChange = {this.onChange}>
		    </input><br/>
		    <input type="submit" value="Lähetä" />
		</form>
	    </div>
	);
	}
}
