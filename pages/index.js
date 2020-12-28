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
import servicePath from '../config/apiUrl'
import axios from 'axios'
import Link from 'next/link'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
function Home(list) {
    const tocify = new Tocify()
    const renderer = new marked.Renderer();
    renderer.heading = function(text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }

    });
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
                                    <span><FireOutlined/>{item.view_count}人</span>
                                </div>
                                <div className='list-context' dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>
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
    let res=await axios.get(servicePath.getArticleList)
    console.log(res)
    return res.data
}
export default withRouter(Home)
