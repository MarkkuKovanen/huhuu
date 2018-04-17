import React from 'react';
import avatar from '../avatar.jpg';
import './styles/Post.css';


export default class PostBox extends React.Component {
	
	
	render() {
		let nameStyle={fontFamily:"verdana",
			fontWeight:"bold",
			padding:10,
			margin:10
		};
		
					
		return(
			<div className='rowsPost'>
				<ul>
					<li className='rowPost'><img src={avatar} width="50" height="50"/></li>
					<li className='rowPost'><h3>{this.props.username}</h3></li>
					<li><p>{this.props.message}</p></li>
				</ul>
			</div>
		)}
}