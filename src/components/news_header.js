/**
 * Created by Administrator on 2017/5/5 0005.
 */
import React from "react";
import axios from "axios";
import {Link} from 'react-router'
import{
    Row,
    Col,
    Menu,
    Icon,
    Button,
    Tabs,
    Modal,
    Form,
    Input,
    message
} from "antd";
import logo from "../images/logo.png";
const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class NewsHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            key:'top',
            username:null,
            userId:null,
            isShow:false
        }
    }
    changeKey=(event)=>{
        console.log(event.key);
        if(event.key==="logAndRes"){
            this.setState({
                isShow:true,
                key:event.key
            })
        }
        this.props.form.resetFields();
        this.setState({key:event.key})
    };

    componentWillMount() {
        //读取用户数据
        let user=JSON.parse(localStorage.getItem("user_KEY"));
        //当读取到用户数据的时候 更新状态
        if(user){
            this.setState({
                username:user.username,
                userId:user.userId
            })
        }
    }
    // 处理对话框显示隐藏的方法
    handleShow=(isShow,event)=>{
        this.setState({isShow})
    };
    handleSubmit=(isRegister,event)=>{
        //阻止默认行为
        event.preventDefault();
        //判断action\
        let action=isRegister?"register":"login";
        //获取表单项的内容，准备url
        let {username, password, r_username, r_password, r_confirmPassword} = this.props.form.getFieldsValue();
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_username=${r_username}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        //发送ajax请求提交数据
        axios.get(url)
            .then(response=>{
                let data = response.data;
                //判断是登录还是注册
                if(isRegister){
                    message.success('恭喜您，注册成功');
                }else{
                    //判断登录是否成功
                    if(!data){//登录失败
                        message.error('登录失败');
                    }else{//登录成功
                        message.success('登录成功');
                        //修改用户状态
                        this.setState({
                            username : data.NickUserName,
                            userId : data.UserId
                        });
                        let {username,userId}=this.state;
                        localStorage.setItem("user_KEY",JSON.stringify({username,userId}))
                    }
                }
            });
        //修改对话框的状态为隐藏;
        this.setState({
            isShow : false
        });
    };
    //处理用户退出
    handleOut=()=>{
      this.setState({
          username:null,
          userId:null
      });
        localStorage.removeItem("user_KEY");
    };
    render(){
        let {key,username,userId,isShow}=this.state;
        let {getFieldDecorator} = this.props.form;
        let UserMenu=username
        ?(
                <MenuItem key="person" className="register">
                    <Button type="primary">{username}</Button>
                    <Button type="dashed"><Link to="/user_center">个人中心</Link></Button>
                    <Button type="Ghost" onClick={this.handleOut}>退出</Button>
                </MenuItem>
        )
        :(
                <MenuItem key="logAndRes" className="register">
                    <Icon type="appstore"/>登录/注册
                </MenuItem>
        );
        return(
            <div>
                <Row >
                    <Col span={1} />
                    <Col span={3} >
                        <div className="logo">
                            <img src={logo} alt="logo"/>
                            <span>ReactNews</span>
                        </div>
                    </Col>
                    <Col span={19} >
                        <Menu onClick={this.changeKey} mode="horizontal" selectedKeys={[key]}>
                            <MenuItem key="top">
                                <Icon type="appstore"/> 头条
                            </MenuItem>
                            <MenuItem key="shehui">
                                <Icon type="appstore"/>社会
                            </MenuItem>
                            <MenuItem key="guonei">
                                <Icon type="appstore"/>国内
                            </MenuItem>
                            <MenuItem key="guoji">
                                <Icon type="appstore"/>国际
                            </MenuItem>
                            <MenuItem key="yule">
                                <Icon type="appstore"/>娱乐
                            </MenuItem>
                            <MenuItem key="tiyu">
                                <Icon type="appstore"/>体育
                            </MenuItem>
                            <MenuItem key="keji">
                                <Icon type="appstore"/>科技
                            </MenuItem>
                            <MenuItem key="shishang">
                                <Icon type="appstore"/>时尚
                            </MenuItem>
                            {UserMenu}
                        </Menu>
                        <Modal title="用户中心" visible={isShow} okText='Close'
                               onOk={this.handleShow.bind(this,false)} onCancel={this.handleShow.bind(this,false)}>
                            <Tabs onChange={()=>this.props.form.resetFields()}>
                                <TabPane tab="登录" key="1">
                                    <Form onSubmit={this.handleSubmit.bind(this,false)} >
                                        <FormItem label="用户名">
                                            {
                                                getFieldDecorator('username')(
                                                    <Input type="text" placeholder="请输入用户名"/>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="密码">
                                            {
                                                getFieldDecorator('password')(
                                                    <Input type="password" placeholder="请输入用户密码"/>
                                                )
                                            }
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">登录</Button>
                                    </Form>
                                </TabPane>
                                <TabPane tab="注册" key="2">
                                    <Form onSubmit={this.handleSubmit.bind(this,true)}>
                                        <FormItem label="用户名">
                                            {
                                                getFieldDecorator('r_username')(
                                                    <Input type="text" placeholder="请输入用户名"/>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="密码">
                                            {
                                                getFieldDecorator('r_password')(
                                                    <Input type="password" placeholder="请输入用户密码"/>
                                                )
                                            }
                                        </FormItem>
                                        <FormItem label="确认密码">
                                            {
                                                getFieldDecorator('r_confirmPassword')(
                                                    <Input type="password" placeholder="请确认用户密码"/>
                                                )
                                            }
                                        </FormItem>
                                        <Button type="primary" htmlType="submit">注册</Button>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </Modal>
                    </Col>
                    <Col span={1} />
                </Row>
            </div>
        )
    }
}
export default Form.create()(NewsHeader);