import React from 'react';
import Card from './Card';
import AddPost from './AddPost';
import PostList from './PostList';
import '../style.css';


export default class Container extends React.Component {


    render () {
        return (
            <div>
				<ul class ="flexContainer">
                <li class ="flexCard"><Card username={this.props.username}/></li>
				<li class ="flexAdd"><AddPost/></li>
				<li class ="flexList"><PostList postList={this.props.postList} /></li>
				</ul>
			</div>
        )
    }
}
