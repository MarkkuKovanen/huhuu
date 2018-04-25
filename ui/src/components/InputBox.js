import React from 'react';

export default class InputBox extends React.Component {
    
    render(){
	return(
	    <div>
	        <label htmlFor={this.props.name}>
                    {this.props.label}
                </label>
	        <input onChange={this.props.onChange}
	               name={this.props.name}
	               autoComplete="false"
	               required
	               type={this.props.type}
                       value={this.props.value}
                       placeholder={this.props.label}
	        />
                <div className="formError">
                    {this.props.error}
                </div>
	    </div>
	)
    }
}
