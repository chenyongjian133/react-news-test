import React from 'react';
import axios from 'axios';
import NewsComments from './news_comments';
import NewsImageBlock from './news_image_block';
import {
    Row,
    Col,
    BackTop
 } from 'antd';

class NewsDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            news:''
        }
    }

    componentWillMount() {
        this.showDetail(this.props)
    }

    componentWillReceiveProps(nextProps) {
        this.showDetail(nextProps)
    }
    showDetail=(props)=>{
        let newsId = props.params.news_id;
        console.log(newsId);
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${newsId}`;
        // let url=`http://wangyi.butterfly.mopaasapp.com/detail/api?simpleId=${newsId}`
        axios.get(url)
            .then(response=>{
                let news=response.data;
                this.setState({news})
            })
            .catch(error=>{
                console.log(error.message);
            })
    }
    render(){
        let {news}=this.state;
        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={16}>
                        <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
                        <NewsComments newsId={this.props.params.news_id}/>
                    </Col>
                    <Col span={6}>
                        <NewsImageBlock title="" type="keji" count="18" width="300px" imgWidth="115px"/>
                        {/*<NewsImageBlock title="" type="tech" count="18" width="300px" imgWidth="115px"/>*/}
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <BackTop/>
            </div>
        )
    }
}




export default NewsDetail