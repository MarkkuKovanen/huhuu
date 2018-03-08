import React from 'react';

export default class CardBottom extends React.Component {

	render() {
		let nameStyle={fontFamily:"verdana",
			fontWeight:"bold",
			padding:10,
			margin:10
		};
		let textStyle={
			fontFamily:"sans-serif",
			padding:5,
			margin:5
		};
		return(
			<div>
			<p style={nameStyle}>/*{this.props.userName}*/Pentti Peruskäyttäjä</p>
			<p style={textStyle}>/*{this.props.esittelyTeksti}*/
			Lorem ipsum dolor sit amet, 
			consectetur adipiscing elit. Nunc suscipit orci 
			in lobortis mattis.
			</p>
			</div>
		)
	}


}