import React, { useEffect, useState, useRef } from 'react';
import { SearchOutlined, PlusOutlined, ArrowLeftOutlined, PlusCircleOutlined, EllipsisOutlined } from '@ant-design/icons';
import '../../assets/styles/sections/menu.css';
import logo from '../../assets/images/247logo.png';
import axios from 'axios';
import { Input, Button } from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useHistory } from "react-router-dom";

function Menu(props) {
    const [menuLists, setMenuLists] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    const [isOpenAddCategory, setIsOpenAddCategory] = useState(false);
    const [categoryCreator, setCategoryCreator] = useState({});
    const [isOpenMoreFunction, setIsOpenMoreFunction] = useState(false);
    const [openMoreFunction, setOpenMoreFunction] = useState();
    const [requestArticle, setRequestArticle] = useState([]);
    const [responseArticle, setResponseArticle] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:44344/api/Category')
            .then((response) => {
                setCategoryList(response.data);
            });
    }, []);

    useEffect(() => {
        axios.get('https://localhost:44344/api/v1/Article')
            .then((response) => {
                setMenuLists(response.data);
            });
    }, []);

    useEffect(() => {
        axios.get('https://localhost:44344/api/v1/request')
            .then((response) => {
                setRequestArticle(response.data);
            });
    }, []);

    useEffect(() => {
        axios.get('https://localhost:44344/api/Response')
            .then((response) => {
                setResponseArticle(response.data);
            });
    }, []);

    const wrapperRef = useRef(null);

    // useEffect(() => {
    //     document.addEventListener("click", handleClickOutside, false);
    //     return () => {
    //         document.removeEventListener("click", handleClickOutside, false);
    //     };
    // }, []);

    // const handleClickOutside = event => {
    //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
    //         setIsOpenMoreFunction(false);
    //     }
    // };

    const renderMenu = menuLists.map((menu, index) => {
        return (
            <div className="menu-item" id={"menu_item_" + index} key={index} onClick={() => handleOpenArticle(index)}>
                <div>{menu.ArticleName}</div>
            </div>
        );
    });

    function handleOpenMoreFunction(index) {
        document.getElementById('more_function_' + index).classList.toggle('display-more');
        //setIsOpenMoreFunction(!isOpenMoreFunction);
    }

    const history = useHistory();

    function handleDeleteArticle(articleId) {
        axios.delete('https://localhost:44344/api/v1/Article/delete-article/' + articleId).then(resp => console.log(resp));
        history.push('/');
        window.location.reload();
    }

    function handleOpenFormEdit(menu) {
        // axios.get('https://localhost:44344​/api​/v1​/request​/' + menu.ArticleID).then(resp => {
        //     setRequestArticle(resp.data);
        // });
        // axios.get('https://localhost:44344/api​/Response​/' + menu.ArticleID).then(resp => {
        //     setResponseArticle(resp.data);
        // });
        var requests = [];
        var responses = [];
        for (let i = 0; i < requestArticle.length; i++) {
            if (requestArticle[i].ArticleID == menu.ArticleID) {
                requests.push(requestArticle[i]);
            }
        }
        for (let i = 0; i < responseArticle.length; i++) {
            if (responseArticle[i].ArticleID == menu.ArticleID) {
                responses.push(responseArticle[i]);
            }
        }
        for (let i = 0; i < requests.length; i++) {
            requests[i].RequestType = requests[i].RequestType.toString();
            requests[i].IsOptional = requests[i].IsOptional.toString();
            requests[i].RequestKindID = requests[i].RequestKindID.toString();
        }
        for (let i = 0; i < responses.length; i++) {
            responses[i].ResponseCode = responses[i].ResponseCode.toString();
        }
        props.handleOpenFormEdit(menu, requests, responses);
    }

    const renderCategory = categoryList.map((categoryItem, index) => {
        return (
            <div key={index} className="wrap-category">
                <div style={{ marginBottom: 20 }}>
                    <Link className="category-name" to="/create">
                        <div>{categoryItem.CategoryName}</div>
                        <div className="icon-add-page" onClick={() => handleGetCategory(categoryItem.CategoryID)}>
                            <PlusCircleOutlined />
                        </div>
                    </Link>
                    <div className="link-list">
                        {menuLists.map((menu, index) => {
                            return (
                                <div key={index}>
                                    {menu.CategoryID == categoryItem.CategoryID &&
                                        <div ref={wrapperRef} className="menu-item" id={"menu_item_" + index} key={index} onClick={() => handleOpenArticle(index)}>
                                            <div style={{ fontFamily: 'Roboto-medium' }}>{menu.ArticleName}</div>
                                            <div className="more-icon" onClick={() => handleOpenMoreFunction(index)}><EllipsisOutlined /></div>
                                            <div className="more-function" id={"more_function_" + index} onClick={() => handleOpenMoreFunction(index)}>
                                                <div className="more-func-item" onClick={() => handleOpenFormEdit(menu)}>
                                                    <Link to={"/" + menu.ArticleName}>Edit</Link>
                                                </div>
                                                <div className="more-func-item" onClick={() => handleDeleteArticle(menu.ArticleID)}>Delete</div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    });

    function handleGetCategory(categoryID) {
        props.handleGetCategory(categoryID);
    }

    function handleOpenArticle(index) {
        // props.handleOpenArticle(menuLists[index]);
        // var selectMenu = document.getElementById("menu_item_" + index);
        // var startMenu = document.getElementById("menu_start");
        // startMenu.classList.remove('menu-active');
        // for (let i = 0; i < menuLists.length; i++) {
        //     let menu = document.getElementById("menu_item_" + i);
        //     menu.classList.remove('menu-active');
        // }
        // selectMenu.classList.add('menu-active');
    }

    function handlecClickMenu() {
        var startMenu = document.getElementById("menu_start");
        for (let i = 0; i < menuLists.length; i++) {
            let menu = document.getElementById("menu_item_" + i);
            menu.classList.remove('menu-active');
        }
        startMenu.classList.add('menu-active');
    }

    function handleOpenCreateNew() {
        setIsOpenPopUp(!isOpenPopUp);
    }

    function handleOpenAddCategory() {
        setIsOpenPopUp(false);
        setIsOpenAddCategory(true);
    }

    function handleCancleAddCategory() {
        setIsOpenAddCategory(false);
        categoryCreator.CategoryName = "";
    }

    function handleSubmitAddCategory() {
        var value = document.getElementById('submitAddCategory').value;
        categoryCreator.CategoryName = value;
        categoryList.push({ CategoryID: "", CategoryName: value })
        axios.post('https://localhost:44344/api/Category', categoryCreator).then(resp => {
            console.log(resp);
        });
        setIsOpenAddCategory(false);
        categoryCreator.CategoryName = "";
    }

    function changeTextInput(e) {
        categoryCreator.CategoryName = e.target.value;
    }

    return (
        <div>
            <div className="wrap-menu">
                <div className="menu-header">
                    <div className="logo-page">
                        <div className="logo-image">
                            <img src={logo} />
                        </div>
                        <div className="page-name">247API</div>
                    </div>
                    <div className="wrap-search">
                        <SearchOutlined />
                    </div>
                </div>
                <div className="menu-content">
                    <div className="fix-menu-item">
                        <div
                            className="menu-item menu-active"
                            id="menu_start"
                            onClick={handlecClickMenu}
                        >
                            <div>Getting Start</div>
                        </div>
                        {renderCategory}
                        <div className="wrap-create-category">
                            <div className="create-category" onClick={handleOpenCreateNew}>
                                <div className="create-category-txt">New</div>
                                <div className="create-category-icon">
                                    <PlusOutlined />
                                </div>
                            </div>
                            <div className="pop-up-create-new" style={isOpenPopUp == false ? { display: 'none' } : { display: 'block' }}>
                                <div className="pop-up-create-option">
                                    <div className="pop-up-create-icon">
                                        <PlusOutlined />
                                    </div>
                                    <div className="pop-up-create-txt">New page</div>
                                </div>
                                <div className="pop-up-create-option" onClick={handleOpenAddCategory}>
                                    <div className="pop-up-create-icon">
                                        <PlusOutlined />
                                    </div>
                                    <div className="pop-up-create-txt">New group</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="menu-footer">
                    <a className="gitbook-footer" href="">
                        <div className="gitbook-logo">
                            <svg preserveAspectRatio="xMidYMid meet" height="40px" width="40px" fill="currentColor" viewBox="0 0 1067 769" xmlns="http://www.w3.org/2000/svg" stroke="none" className="icon-7f6730be--text-3f89f380"><g><path d="M480.026 640.677c17.205 0 31.2 13.997 31.2 31.194s-13.995 31.193-31.2 31.193c-17.197 0-31.193-13.996-31.193-31.193 0-17.197 13.996-31.194 31.193-31.194m489.93-193.226c-17.203 0-31.2-13.998-31.2-31.195 0-17.204 13.997-31.2 31.2-31.2 17.198 0 31.194 13.996 31.194 31.2 0 17.197-13.996 31.195-31.193 31.195m0-127.804c-53.269 0-96.609 43.34-96.609 96.609 0 10.373 1.723 20.702 5.123 30.741L559.328 616.879c-18.132-26.128-47.521-41.617-79.302-41.617-36.821 0-70.391 21.065-86.63 54.003L106.68 478.109c-30.288-15.927-52.965-65.817-50.56-111.223 1.248-23.687 9.438-42.071 21.897-49.17 7.916-4.493 17.436-4.099 27.526 1.188l1.916 1.01c75.96 40.022 324.6 170.981 335.063 175.844 16.157 7.47 25.14 10.5 52.659-2.547l513.958-267.3c7.53-2.844 16.315-10.062 16.315-21.023 0-15.205-15.72-21.199-15.765-21.199-29.218-14.018-74.163-35.054-117.987-55.57C798.033 84.26 691.861 34.547 645.23 10.132c-40.253-21.072-72.655-3.311-78.432.282l-11.227 5.555C345.727 119.743 64.898 258.826 48.911 268.553 20.278 285.973 2.547 320.679.252 363.768c-3.586 68.304 31.261 139.506 81.069 165.634l303.172 156.354c6.83 47.306 47.55 82.725 95.532 82.725 52.78 0 95.808-42.546 96.603-95.14L910.541 492.38c16.93 13.233 37.92 20.486 59.416 20.486 53.268 0 96.61-43.341 96.61-96.61s-43.342-96.61-96.61-96.61" fillRule="evenodd"></path></g></svg>
                        </div>
                        <div className="gitbook-txt">
                            <p>Powered by <b>GitBook</b></p>
                        </div>
                    </a>
                </div>
            </div>
            <div className="form-add-category" style={isOpenAddCategory == false ? { display: 'none' } : { display: 'block' }}>
                <div className="form-add-category-header">
                    <div className="form-add-category-title">Category</div>
                    <div className="form-add-category-icon" onClick={handleCancleAddCategory}>
                        <ArrowLeftOutlined />
                    </div>
                </div>
                <div className="form-add-category-body">
                    <div className="form-add-category-body-txt">TITLE</div>
                    <div className="form-add-category-body-input">
                        <Input
                            placeholder="New Category"
                            id="submitAddCategory"
                            onChange={changeTextInput}
                        />
                    </div>
                </div>
                <div className="wrap-btn-submit">
                    <Button type="primary" onClick={handleCancleAddCategory}>Cancel</Button>
                    <Button type="primary" onClick={handleSubmitAddCategory}>Save</Button>
                </div>
            </div>
            <div className="insert-screen" style={isOpenAddCategory == false ? { display: 'none' } : { display: 'block' }}></div>
        </div>
    );
}

export default Menu;