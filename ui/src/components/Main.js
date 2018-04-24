import React from 'react';
import Card from './Card';
import AddPost from './AddPost';
import PostList from './PostList';
import '../style.css';


export default class Container extends React.Component {


    render () {
        return (
            <div>
				<ul class ="flex-container">
                <li class ="flex-item"><Card username={this.props.username}/></li>
				<li class ="flex-item"><AddPost/></li>
				<li class ="flex-list"><PostList postList={this.props.postList} /></li>
				</ul>
			</div>
        )
    }
}
