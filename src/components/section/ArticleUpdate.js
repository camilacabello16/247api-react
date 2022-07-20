import React, { useState, useEffect } from 'react';
import '../../assets/styles/article-created.css';
import {
    Form,
    Input,
    Button,
    Select,
    Tabs
} from 'antd';
import 'antd/dist/antd.css';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

const { TabPane } = Tabs;

function ArticleUpdate(props) {
    const { Option } = Select;

    const { TextArea } = Input;

    const [request, setRequest] = useState({});
    const [requestArray, setRequestArray] = useState([]);

    const [article, setArticle] = useState({});

    const [articleCreator, setArticleCreator] = useState({});

    const [articleDetail, setArticleDetail] = useState({});

    const [requestList, setRequestList] = useState([]);

    const [responseList, setResponseList] = useState([]);

    const [articleUpdateID, setArticleUpdateID] = useState('');

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const onFinish = values => {
        console.log(values);
        if (values.ApiType == null) {
            values.ApiType = 0;
        }
        if (values.responseApi == null) {
            values.responseApi = props.responses;
        }
        for (let i = 0; i < values.requestApi.length; i++) {
            if (values.requestApi[i].RequestType == null) {
                values.requestApi[i].RequestType = 0;
            }
            if (values.requestApi[i].IsOptional == null) {
                values.requestApi[i].IsOptional = 0;
            }
            if (values.requestApi[i].RequestID == null) {
                values.requestApi[i].RequestID = uuidv4();
            }
            values.requestApi[i].ArticleID = props.articleInfo.ArticleID;
        }
        for (let i = 0; i < values.responseApi.length; i++) {
            if (values.responseApi[i].ResponseCode == null) {
                values.responseApi[i].ResponseCode = 0;
            }
            if (values.responseApi[i].ResponseID == null) {
                values.responseApi[i].ResponseID = uuidv4();
            }
            values.responseApi[i].ArticleID = props.articleInfo.ArticleID;
        }
        for (let i = 0; i < Object.keys(values).length; i++) {
            if (Object.keys(values)[i] !== "requestApi" || Object.keys(values)[i] !== "responseApi") {
                article[Object.keys(values)[i]] = values[Object.keys(values)[i]];
            }
        }
        article.ArticleID = props.articleInfo.ArticleID;
        article.CategoryID = props.articleInfo.CategoryID;
        articleCreator["articleApi"] = article;
        articleCreator["requestApi"] = values.requestApi;
        articleCreator["responseApi"] = values.responseApi;
        console.log(articleCreator);
        axios.put("https://localhost:44344/api/v1/Article/update-article", articleCreator)
            .then(resp => console.log(resp))
    };

    useEffect(() => {
        setArticleDetail(props.articleInfo);
        setArticleUpdateID(props.articleInfo.ArticleID);
    }, [props.articleInfo])

    function handleDeleteRequest(e) {
        console.log(e);
    }

    return (
        <div className="article-post-page">
            <div className="form-post-article">
                <Form
                    layout="horizontal"
                    onFinish={onFinish}
                    initialValues={{
                        ArticleName: props.articleInfo.ArticleName,
                        BriefDescription: props.articleInfo.BriefDescription,
                        ApiType: props.articleInfo.ApiType.toString(),
                        ApiName: props.articleInfo.ApiName,
                        ApiLink: props.articleInfo.ApiLink,
                        ApiExample: props.articleInfo.ApiExample,
                        requestApi: props.requests,
                        responseApi: props.responses,
                    }}
                >
                    <div className="wrap-form-title">
                        <Form.Item name="ArticleName">
                            <Input
                                placeholder="Title"
                                style={{
                                    border: 'none',
                                    outline: 'none',
                                    boxShadow: 'none',
                                    fontSize: 32,
                                    fontFamily: 'Roboto-medium'
                                }}
                            />
                        </Form.Item>
                        <Form.Item name="BriefDescription">
                            <Input placeholder="Page Description" style={{
                                border: 'none',
                                outline: 'none',
                                boxShadow: 'none',
                                fontSize: 16
                            }} />
                        </Form.Item>
                    </div>
                    <div className="wrap-form-body">
                        <div className="form-body-type">
                            <Form.Item name="ApiType">
                                <Select defaultValue={props.articleInfo.ApiType} id="api_method">
                                    <Option value="0">GET</Option>
                                    <Option value="1">POST</Option>
                                    <Option value="2">PUT</Option>
                                    <Option value="3">DELETE</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="ApiName">
                                <Input placeholder="Title Method" style={{
                                    border: 'none',
                                    outline: 'none',
                                    boxShadow: 'none',
                                    fontSize: 20,
                                    fontFamily: 'Roboto-medium'
                                }} />
                            </Form.Item>
                        </div>
                        <Form.Item name="ApiLink">
                            <Input placeholder="API Method Path" style={{
                                border: 'none',
                                outline: 'none',
                                boxShadow: 'none',
                                fontSize: 16,
                                backgroundColor: '#F5F7F9',
                                fontFamily: 'Roboto-medium'
                            }} />
                        </Form.Item>
                        <Tabs defaultActiveKey="1" type="card">
                            <TabPane tab="Request" key="1">
                                <Form.List name="requestApi">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                <div className="content-list-item" key={key}>
                                                    <div className="list-req-item">
                                                        <div className="req-name">
                                                            <div>
                                                                <Form.Item
                                                                    name={[name, 'RequestID']}
                                                                    style={{
                                                                        display: 'none'
                                                                    }}
                                                                >
                                                                    <Input />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="req-name-txt">
                                                                <Form.Item
                                                                    name={[name, 'RequestName']}
                                                                >
                                                                    <Input placeholder="Parameter Name" style={{
                                                                        border: 'none',
                                                                        outline: 'none',
                                                                        boxShadow: 'none',
                                                                        fontSize: 16
                                                                    }} />
                                                                </Form.Item>
                                                            </div>
                                                            <div className="req-optional">
                                                                <Form.Item
                                                                    name={[name, 'IsOptional']}
                                                                >
                                                                    <Select defaultValue="0" style={{
                                                                        border: 'none'
                                                                    }}>
                                                                        <Option value="0">REQUIRED</Option>
                                                                        <Option value="1">OPTIONAL</Option>
                                                                    </Select>
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div className="req-type">
                                                            <div className="req-type-txt">
                                                                <Form.Item
                                                                    name={[name, 'RequestType']}
                                                                >
                                                                    <Select defaultValue="0">
                                                                        <Option value="0">string</Option>
                                                                        <Option value="1">array</Option>
                                                                        <Option value="2">number</Option>
                                                                        <Option value="3">integer</Option>
                                                                        <Option value="4">object</Option>
                                                                        <Option value="5">boolean</Option>
                                                                    </Select>
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div className="req-description">
                                                            <div className="req-description-txt">
                                                                <Form.Item
                                                                    name={[name, 'RequestDescription']}
                                                                >
                                                                    <Input placeholder="Briefly describe this parameter..." style={{
                                                                        border: 'none',
                                                                        outline: 'none',
                                                                        boxShadow: 'none',
                                                                        fontSize: 16
                                                                    }} />
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                        <div className="req-kind">
                                                            <div className="req-kind-txt">
                                                                <Form.Item
                                                                    name={[name, 'RequestKindID']}
                                                                >
                                                                    <Select defaultValue="5">
                                                                        <Option value="1">Path Parameters</Option>
                                                                        <Option value="2">Headers</Option>
                                                                        <Option value="3">Query Parameters</Option>
                                                                        <Option value="4">Form Data Parameters</Option>
                                                                        <Option value="5">Body Parameters</Option>
                                                                    </Select>
                                                                </Form.Item>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="icon-remove-item" onClick={handleDeleteRequest}>
                                                        <CloseOutlined onClick={() => remove(name)} />
                                                    </div>
                                                </div>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    style={{
                                                        border: 'none',
                                                        fontSize: 15,
                                                        color: '#74818D',
                                                        width: 170,
                                                        boxShadow: 'none'
                                                    }}
                                                    onClick={() => add()} block icon={<PlusOutlined />}
                                                >
                                                    Add a parameter
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </TabPane>
                            <TabPane tab="Response" key="2">
                                <Form.List name="responseApi">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                                <div key={key} className="wrap-response-post">
                                                    <Form.Item
                                                        name={[name, 'ResponseID']}
                                                        style={{
                                                            display: 'none'
                                                        }}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item name={[name, 'ResponseCode']}>
                                                        <Select defaultValue="0" clearIcon={true}>
                                                            <Option value="0">
                                                                <div style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <div style={{
                                                                        width: 10,
                                                                        height: 10,
                                                                        backgroundColor: '#26CB7C',
                                                                        borderRadius: 100,
                                                                        marginRight: 5
                                                                    }}></div>
                                                                    <div>200: OK</div>
                                                                </div>
                                                            </Option>
                                                            <Option value="1">
                                                                <div style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <div style={{
                                                                        width: 10,
                                                                        height: 10,
                                                                        backgroundColor: '#FF4642',
                                                                        borderRadius: 100,
                                                                        marginRight: 5
                                                                    }}></div>
                                                                    <div>404: Not Found</div>
                                                                </div>
                                                            </Option>
                                                            <Option value="2">
                                                                <div style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <div style={{
                                                                        width: 10,
                                                                        height: 10,
                                                                        backgroundColor: '#FF4642',
                                                                        borderRadius: 100,
                                                                        marginRight: 5
                                                                    }}></div>
                                                                    <div>400: Bad Request</div>
                                                                </div>
                                                            </Option>
                                                            <Option value="3">
                                                                <div style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center'
                                                                }}>
                                                                    <div style={{
                                                                        width: 10,
                                                                        height: 10,
                                                                        backgroundColor: '#FF9D3D',
                                                                        borderRadius: 100,
                                                                        marginRight: 5
                                                                    }}></div>
                                                                    <div>302: Found</div>
                                                                </div>
                                                            </Option>
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item name={[name, 'ResponseDescription']}>
                                                        <Input placeholder="Briefly describe this response example..." style={{
                                                            border: 'none',
                                                            outline: 'none',
                                                            boxShadow: 'none',
                                                            fontSize: 16
                                                        }} />
                                                    </Form.Item>
                                                    <Form.Item name={[name, 'ResponseContent']}>
                                                        <TextArea style={{
                                                            backgroundColor: 'red',
                                                            borderRadius: 3,
                                                            color: '#fff',
                                                            outline: 'none',
                                                            boxShadow: 'none',
                                                            padding: 25,
                                                            backgroundColor: '#183055'
                                                        }} />
                                                    </Form.Item>
                                                    <div className="icon-remove-item-resp">
                                                        <CloseOutlined onClick={() => remove(name)} />
                                                    </div>
                                                </div>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    style={{
                                                        border: 'none',
                                                        fontSize: 15,
                                                        color: '#74818D',
                                                        width: 170,
                                                        boxShadow: 'none'
                                                    }}
                                                    onClick={() => add()} block icon={<PlusOutlined />}
                                                >
                                                    Add Response Example
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </TabPane>
                        </Tabs>
                        <div className="api-example-input">
                            <div style={{
                                marginBottom: 10,
                                fontFamily: 'Roboto-medium'
                            }}>Example: </div>
                            <Form.Item name="ApiExample">
                                <TextArea style={{
                                    backgroundColor: 'red',
                                    borderRadius: 3,
                                    color: '#fff',
                                    outline: 'none',
                                    boxShadow: 'none',
                                    padding: 25,
                                    backgroundColor: '#183055'
                                }} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="btn-submit-form-post">
                        <Form.Item>
                            <Button style={{ backgroundColor: '#26CB7C' }} type="primary" htmlType="submit">Update</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default ArticleUpdate;