import React from 'react';

class NewsDetail extends React.Component{
    render(){
        return (
            <div>
                NewsDetail....{this.props.params.news_id};
            </div>
        )
    }
}
export default NewsDetail