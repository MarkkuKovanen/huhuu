import React from 'react';
import avatar from '../avatar.jpg';

export default class CardTop extends React.Component {

	render() {
		let topStyle={
			width:175,
			height:175,
			backgroundColor: "#335533",
			display: 'flex',
			alignItems:'center',
			justifyContent: 'center'
		}
	
	return(
		<div style={topStyle}>
			<div className="avatar">
				<img src={avatar} width="150" height="150"/>
			</div>
		</div>
	)
	}


}