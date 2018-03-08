import React from 'react';

export default class InputBox extends React.Component {

	render(){
		let inputStyle ={
			height: '2em',
			margin: '5px',
			border: '2px solid #335533',
			fontFamily: 'sans-serif'
		}
	return(
		<div className="Input">
			<input style={inputStyle}
				id={this.props.id}
				autoComplete="false"
				required
				type={this.props.type}
				placeholder={this.props.placeholder}
				/>	
			<label htmlFor={this.props.id}></label>
		</div>
	)}

}