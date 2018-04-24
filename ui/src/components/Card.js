import React from 'react';
import CardBottom from './CardBottom';
import CardTop from './CardTop';

export default class Card extends React.Component {
	constructor(props) {
		super(props);
	}

	
	render(){
		let cardStyle ={
			width:175,
			height:350,
			
			
		}
		return(
			<div style={cardStyle}>
			<CardTop/>
			<CardBottom username={this.props.username}/>
			</div>
		)}
}
