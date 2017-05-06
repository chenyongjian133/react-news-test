import React from 'react';
import {Link} from 'react-router';
import NewsImageBlock from "./news_image_block";
import NewsBlock from './news_block';
import NewsProduct from './news_product';
import {
    Row,
    Col,
    Carousel,
    Tabs,
} from 'antd';
import carousel_1 from '../images/carousel_1.jpg';
import carousel_2 from '../images/carousel_2.jpg';
import carousel_3 from '../images/carousel_3.jpg';
import carousel_4 from '../images/carousel_4.jpg';
import '../componentsCss/news_container.css';

const TabPane = Tabs.TabPane;
class NewsContainer extends React.Component{
    render(){
        return (
            <div>
               <div className="newsContainer">
                   <Row>
                       <Col span={1}/>
                       <Col span={22}>
                           <div className="leftContainer1">
                               <Carousel autoplay>
                                  <div><img src={carousel_1} alt=""/></div>
                                  <div><img src={carousel_2} alt=""/></div>
                                  <div><img src={carousel_3} alt=""/></div>
                                  <div><img src={carousel_4} alt=""/></div>
                               </Carousel>
                               <NewsImageBlock title="国际头条" count={6} type="war" width="100%" imgWidth="115px"/>
                           </div>
                           <Tabs className="news_tab">
                               <TabPane tab="娱乐新闻" key="1">
                                   <NewsBlock type="ent" count={27}/>
                               </TabPane>
                               <TabPane tab="科技" key="2">
                                   <NewsBlock type="tech" count={27}/>
                               </TabPane>
                           </Tabs>
                           <Tabs className="news_product">
                               <TabPane tab="React产品" key="1">
                                   <NewsProduct></NewsProduct>
                               </TabPane>
                           </Tabs>
                           <div>
                               <NewsImageBlock title="国内新闻" type="edu" count="9" width="100%" imgWidth="115px"/>
                               <NewsImageBlock title="娱乐新闻" type="ent" count="17" width="100%" imgWidth="115px"/>
                           </div>
                       </Col>
                       <Col span={1}/>
                   </Row>
               </div>
            </div>
        )
    }
}
export default NewsContainer