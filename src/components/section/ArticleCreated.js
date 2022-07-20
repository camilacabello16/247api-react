import React, { useState } from 'react';
import '../../assets/styles/article-created.css';
import { Input, Select, Button } from 'antd';
import 'antd/dist/antd.css';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

function ArticleCreated() {
    const { Option } = Select;

    const [article, setArticle] = useState({
        articleApi: {
            ArticleName: "",
            BriefDescription: "",
            ApiName: "",
            ApiType: 0,
            ApiLink: "",
            ApiExample: "",
            ApiResponse: ""
        },
        requestApi: []
    });

    const [request, setRequest] = useState({
        RequestName: '',
        RequestType: 0,
        RequestDescription: '',
        IsOptional: 0
    });
    const [requestArray, setRequestArray] = useState([{}]);

    const renderListRequest = requestArray.map((req, index) => {
        return (
            <div className="request-post-item" key={index}>
                <div className="request-post-input">
                    <Input style={{ marginRight: 10 }} placeholder="Nhập tên request" id={"req_name_" + index} />
                    {/* <Select defaultValue="Kiểu dữ liệu" id={"req_type_" + index} style={{ width: 100, marginRight: 10 }}>
                        <Option value="0">string</Option>
                        <Option value="1">array</Option>
                        <Option value="2">number</Option>
                        <Option value="3">integer</Option>
                    </Select> */}
                    <select id={"req_type_" + index} className="select-request">
                        <option value="0">string</option>
                        <option value="1">array</option>
                        <option value="2">number</option>
                        <option value="3">integer</option>
                    </select>
                    <Input style={{ marginRight: 10, marginLeft: 10 }} id={"req_description_" + index} placeholder="Nhập mô tả request" />
                    {/* <Select defaultValue="REQUIRED" id={"req_select_" + index} style={{ width: 100 }}>
                        <Option value="0">REQUIRED</Option>
                        <Option value="1">OPTIONAL</Option>
                    </Select> */}
                    <select id={"req_select_" + index} className="select-request">
                        <option value="0">Required</option>
                        <option value="1">Optional</option>
                    </select>
                </div>
                <div className="btn-trash-request" onClick={() => handleDeleteRequest(index)}>
                    <DeleteOutlined />
                </div>
            </div>
        )
    });

    function handleAddRequest() {
        var cloneRequestArray = [...requestArray];
        cloneRequestArray.push(request);
        setRequestArray(cloneRequestArray);
        console.log(requestArray);
    }

    function handleDeleteRequest(index) {
        //console.log(document.getElementById("req_select_1").value);
        for (let i = 0; i < requestArray.length; i++) {
            requestArray[i].RequestName = document.getElementById("req_name_" + i).value;
            requestArray[i].RequestType = document.getElementById("req_type_" + i).value;
            requestArray[i].RequestDescription = document.getElementById("req_description_" + i).value;
            requestArray[i].IsOptional = document.getElementById("req_select_" + i).value;
        }
    }

    function handleSubmitArticle() {
        // articleApi: {
        //     ArticleName: "",
        //     BriefDescription: "",
        //     ApiName: "",
        //     ApiType: 0,
        //     ApiLink: "",
        //     ApiExample: "",
        //     ApiResponse: ""
        // },
        // requestApi: []
        article.articleApi.ArticleName = document.getElementById("article_name").value;
        article.articleApi.BriefDescription = document.getElementById("article_description").value;
        article.articleApi.ApiName = document.getElementById("article_api_name").value;
        article.articleApi.ApiType = document.getElementById("api_method").value;
        article.articleApi.ApiLink = document.getElementById("api_link").value;
        article.articleApi.ApiResponse = document.getElementById("api_response").value;
        article.articleApi.ApiExample = document.getElementById("api_example").value;
        for (let i = 0; i < requestArray.length; i++) {
            requestArray[i].RequestName = document.getElementById("req_name_" + i).value;
            requestArray[i].RequestType = document.getElementById("req_type_" + i).value;
            requestArray[i].RequestDescription = document.getElementById("req_description_" + i).value;
            requestArray[i].IsOptional = document.getElementById("req_select_" + i).value;
        }
        article.requestApi = [...requestArray];
        console.log(requestArray);
        // axios.post("https://localhost:44344/api/v1/Article/insert-article", article)
        //     .then(resp => console.log(resp))
    }

    return (
        <div className="article-post-page">
            <div className="post-title">Đăng bài hướng dẫn tích hợp API</div>
            <div className="form-post-article">
                <div className="form-post-item">
                    <Input placeholder="Nhập tên bài viết" id="article_name" />
                </div>
                <div className="form-post-item">
                    <Input placeholder="Nhập mô tả bài viết" id="article_description" />
                </div>
                <div className="form-post-item">
                    <Input style={{ marginRight: 10 }} placeholder="Nhập tên API" id="article_api_name" />
                    {/* <Select defaultValue="Loại api" id="api_method" style={{ width: 120 }}>
                        <Option value="0">GET</Option>
                        <Option value="1">POST</Option>
                        <Option value="2">PUT</Option>
                        <Option value="3">DELETE</Option>
                    </Select> */}
                    <select id="api_method" className="select-request">
                        <option value="0">GET</option>
                        <option value="1">POST</option>
                        <option value="2">PUT</option>
                        <option value="3">DELETE</option>
                    </select>
                </div>
                <div className="form-post-item">
                    <Input placeholder="Nhập đường dẫn api" id="api_link" />
                </div>
                <div className="form-post-request">
                    <div className="btn-add-request" onClick={handleAddRequest}>
                        <PlusOutlined />
                    </div>
                    <div className="request-post">
                        {renderListRequest}
                    </div>
                </div>
                <div className="form-post-item">
                    <Input placeholder="Nhập response api" id="api_response" />
                </div>
                <div className="form-post-item">
                    <Input placeholder="Nhập mẫu ví dụ" id="api_example" />
                </div>
            </div>
            <div className="wrap-button-post">
                <Button type="primary" onClick={handleSubmitArticle}>Đăng bài</Button>
            </div>
        </div>
    );
}

export default ArticleCreated;