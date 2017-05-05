import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import App from './components/app';
import NewsContainer from './components/news_container';
import NewsDetail from './components/news_detail';
import UserCenter from './components/user_center';
import './index.css';

ReactDOM.render(
    (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={NewsContainer}></IndexRoute>
                <Route path="/news_detail/:news_id" component={NewsDetail}></Route>
                <Route path="/user_center" component={UserCenter}></Route>
            </Route>
        </Router>
    ),
    document.getElementById('root')
);
