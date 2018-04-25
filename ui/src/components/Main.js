import React from 'react';
import Card from './Card';
import AddPost from './AddPost';
import PostList from './PostList';
import '../style.css';


export default class Container extends React.Component {


    render () {
        return (
            <div class="container">
				<aside>
					<Card user={this.props.user}/>
				</aside>
				<main>
					<AddPost/>
					<br/>
					<br/>
					<PostList class="postlist" postList={this.props.postList} />
				</main>
			</div>
        )
    }
}
