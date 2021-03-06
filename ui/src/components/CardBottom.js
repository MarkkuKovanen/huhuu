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
			<p style={nameStyle}>{this.props.user.username}</p>
			<p style={textStyle}>/{this.props.user.introduction}</p>
			</div>
		)
	}


}
