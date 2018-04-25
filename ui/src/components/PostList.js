import React from 'react';
import Post from './Post';

export default class PostList extends React.Component {

render () {
		
	let tempView = {}
	if (this.props.postList.length === 0) {
		tempView = <p>No posts to show</p>
		} else {
			tempView = this.props.postList.map((post) => 
				<tr>
					<td><Post message={post.message} 
							created={post.created}
							username={post.user.username}
							photo={post.photo}
							image={post.image}							
					/></td>
				</tr>
		)}
			
	return(
		<div>
			<center>
			<table>
				<thead>
					<tr>
						<th>New posts</th>
					</tr>
				</thead>
				<tbody>
					{tempView}
				</tbody>
			</table>
			</center>
		</div>
	)}
}
