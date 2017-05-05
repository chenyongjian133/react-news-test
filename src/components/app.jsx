import React from 'react';
import NewsHeader from './news_header';
class App extends React.Component{
    render(){
        return (
            <div>
                <NewsHeader/>
                {this.props.children}
                <div>footer....</div>
            </div>
        )
    }
}
export default App