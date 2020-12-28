import React, {useState, useEffect} from 'react';
import '../styles/components/header.css'
import {Row, Col, Menu} from 'antd'
import {PlayCircleTwoTone, MehTwoTone, HomeTwoTone, MessageOutlined} from '@ant-design/icons';
import axios from 'axios'
import Router from 'next/router'
import Link from 'next/link'
import servicePath from '../config/apiUrl'

const Header = () => {
    const [navArray, setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios(servicePath.getTypeInfo)
            setNavArray(res.data.data)
        }
        fetchData()
    }, [])
    const handleClick = e => {
        if (e.key == '0') {
            Router.push('/')
        } else {
            Router.push('/list?id=' + e.key)
        }
    }
    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className='header-logo'>李廷琛</span>
                    <span className='header-txt'>专注前端开发,每年100集免费视频。</span>
                </Col>
                <Col className='memu-div' xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0" icon={<HomeTwoTone/>} >
                            首页
                        </Menu.Item>
                        {
                            navArray.map(item => {
                                // console.log(item)
                                return (
                                    // <>
                                    //     item.icon
                                        <Menu.Item key={item.Id}>
                                            {item.typeName}
                                        </Menu.Item>
                                    // </>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}


export default Header
