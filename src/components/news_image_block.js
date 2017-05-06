/**
 * Created by Administrator on 2017/5/6 0006.
 */
import React from "react";
import axios from "axios";
import {Link} from "react-router";
import {
    Card,
} from "antd";

import "../componentsCss/news_image_block.css"
class NewsImageBlock extends React.Component{
    constructor(props){
        super(props);
        this.state={
            newsArr:[]
        }
    }

    componentWillMount() {
        let {type,count}=this.props;
       // 配置url接口参数
       //  let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        let url = `http://wangyi.butterfly.mopaasapp.com/news/api?&type=${type}&page=1&limit=${count}`
      //  发生请求获取图片和新闻
        axios.get(url)
            .then(response=>{
                //获取新闻数据
                let newsArr=response.data.list;
                //更新新闻数据的状态
                this.setState({newsArr})
            })
            .catch(error=>{
                console.log(error.message);
            })
    }
    render(){
        let {title,type,count,width,imgWidth}=this.props;
        let {newsArr}=this.state;
        let newsList=newsArr.length>0
        ?(
            newsArr.map((news,index)=>{
                return (
                    <div className="imgNewsContainer" key={index}>
                        <Link to={`/new_detail/${news.docurl}`}>
                            <div>
                                <img style={{width : imgWidth}} src={news.imgurl} alt=""/>
                            </div>
                            <div>
                                <h3 style={{width : imgWidth}}>{news.title}</h3>
                                <p style={{width : imgWidth}}>{news.time}</p>
                            </div>
                        </Link>
                    </div>
                )
            })
        )
        :"暂时没有新闻推送";
        return(
            <div>
                <Card title={title} style={{width,marginBottom:"20px"}}>
                    {newsList}
                </Card>
            </div>
        )
    }
}
NewsImageBlock.propTypes = {
    title : React.PropTypes.string.isRequired,
    type : React.PropTypes.string.isRequired,
    count : React.PropTypes.number.isRequired,
    width : React.PropTypes.string.isRequired,
    imgWidth : React.PropTypes.string.isRequired
};
export default NewsImageBlock;