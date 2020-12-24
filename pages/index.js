import Head from 'next/head'
import Header from '../components/Header'
import React from 'react'
import {Col, Row} from "antd";
export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
        <Header/>
        <Row className="comm-mai" type="flex" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                左边
            </Col>
            <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                右边
            </Col>
        </Row>
      </>
  )
}
