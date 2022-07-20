import React, { useState, useEffect } from 'react';
import '../../assets/styles/pages/layout-page.css';
import Menu from '../section/Menu';
import axios from 'axios';
import ArticleCreated2 from '../section/ArticleCreated2';
import ArticleUpdate from '../section/ArticleUpdate'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import DefaultPage from '../section/DefaultPage';
import responsiveObserve from 'antd/lib/_util/responsiveObserve';

function LayoutPage() {
    const [articleInfo, setArticleInfo] = useState({});
    const [categoryCreator, setCategoryCreator] = useState();
    const [articles, setArticles] = useState([]);
    const [requests, setRequests] = useState([]);
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:44344/api/v1/Article')
            .then((response) => {
                setArticles(response.data);
            });
    }, []);

    function handleGetCategory(categoryID) {
        setCategoryCreator(categoryID);
    }

    function handleOpenFormEdit(articleInfo, req, resp) {
        setArticleInfo(articleInfo);
        setRequests(req);
        setResponses(resp);
    }

    return (
        <div className="page-container">
            <Router>
                <Menu
                    handleGetCategory={handleGetCategory}
                    handleOpenFormEdit={handleOpenFormEdit}
                />
                <div className="page-content">
                    <Switch>
                        {articles.map((article, index) => {
                            return (
                                <Route key={index} path={"/" + article.ArticleName}>
                                    <ArticleUpdate
                                        articleInfo={articleInfo}
                                        requests={requests}
                                        responses={responses}
                                    />
                                </Route>
                            );
                        })}
                        <Route path="/create">
                            <ArticleCreated2
                                categoryCreator={categoryCreator}
                            />
                        </Route>
                        <Route path="/">
                            <DefaultPage />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default LayoutPage;