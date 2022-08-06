import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Typography, Space, Menu } from 'antd'
import { Navbar, HomePage, Cryptocurrencies, CryptoDetails, News } from './components/'


import './App.css'
const { Header, Content, Footer, Sider } = Layout;
const App = () => {
  return (
    <Layout>
        <Navbar/>
        <Layout>
            <Header
                className="site-layout-sub-header-background"
                style={{
                padding: 0,
                }}
            />
            <Content
                style={{
                margin: '24px 16px 0',
                }}
            >
                <div
                className="site-layout-background"
                style={{
                    padding: 24,
                    minHeight: 360,
                }}
                >
                    <Routes>
                        <Route exact path='/' element={<HomePage/>}/>
                        <Route exact path='/cryptocurrencies' element={<Cryptocurrencies/>}/>
                        <Route exact path='/crypto/:coinId' element={<CryptoDetails/>}/>
                        <Route exact path='/news' element={<News/>}/>
                    </Routes>
                </div>
            </Content>
            <Footer
                style={{
                textAlign: 'center',
                }}
            >
                <Typography.Title level={5}>
                    enCrypt <br/>
                    All rights reserved
                </Typography.Title>
                <Space>
                    <Link to='/'>Home</Link>
                    <Link to='/news'>News</Link>
                </Space>
            </Footer>
        </Layout>
    </Layout>
  )
}

export default App