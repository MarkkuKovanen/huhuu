import React from 'react';
import Card from './Card';
import AddPost from './AddPost';


export default class Container extends React.Component {


    render () {
        return (
            <div>
                <Card />
				<AddPost/>
			</div>
        )
    }
}
