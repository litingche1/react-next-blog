import Head from 'next/head'
import Header from '../components/Header'
import {withRouter} from "next/router";
import React, {useState} from 'react'
import {Col, List, Row} from "antd";
import '../styles/pages/index.css'
import { CalendarOutlined , FolderOutlined, FireOutlined   } from '@ant-design/icons';
import Authors from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import Link from 'next/link'
function Home(list) {
    console.log(list)
    const [myList, setMyList] = useState(list.data)
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
        <Header/>
        <Row className="comm-mai" type="flex" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                <List
                    header={<div>最新日志</div>}
                    itemLayout="vertical"
                    dataSource={myList}
                    renderItem={
                        item=>(
                            <List.Item>
                                <div className="list-title">
                                    <Link href={{pathname:'/detailed',query:{id:item.id}}}><a>{item.title}</a></Link>

                                </div>
                                <div className="list-icon">
                                    <span><CalendarOutlined/>{item.addTime}</span>
                                    <span><FolderOutlined/>{item.typeName}</span>
                                    <span><FireOutlined/>{item.view_count}</span>
                                </div>
                                <div className='list-context'>{item.introduce}</div>
                            </List.Item>
                        )
                    }


                />
            </Col>
            <Col className="comm-box" xs={0} sm={0} md={7} lg={5} xl={4}>
                <Authors/>
                <Advert/>
            </Col>
        </Row>
        <Footer/>
      </>
  )
}
Home.getInitialProps  = async ()=>{
    let res=await axios.get('http://127.0.0.1:7001/default/getArticleList')
    console.log(res)
    return res.data
}
export default withRouter(Home)
