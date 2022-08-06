import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic, Space, Divider, Tooltip  } from 'antd'
import { Link } from 'react-router-dom'
import { Cryptocurrencies, News } from '../components'
import { useGetCryptosQuery } from '../services/cryptoApi'
import icon from '../images/encrypt.png'
import { EllipsisOutlined } from '@ant-design/icons'

import { Loading } from './'
const { Title } = Typography;
const HomePage = () => {

  const { data, isFetching } = useGetCryptosQuery(10)

  const globalStats = data?.data?.stats

  return (
    <div>
    { isFetching ? <Loading/>
       :
       <>
        <Space>
          <img src={icon} style={{maxWidth: '80px', height: '80px'}}/>
          <Title level={2} className="heading">The Latest on Cryptocurrencies</Title>
        </Space>
        <Divider/>
        <Title level={3} className="heading">Global Crypto Stats</Title>
        <Row>
          <Col span={8}>
            <Statistic title="Total Cryptocurrencies" value={globalStats.total}/>
          </Col>
          <Col span={8}>
            <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/>
          </Col>
          <Col span={8}>
            <Statistic title="Total Market Caps" value={millify(globalStats.totalMarketCap)}/>
          </Col>
          <Col span={8}>
            <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/>
          </Col>
          <Col span={8}>
            <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/>
          </Col>
        </Row>
        <div className='home-heading-container'>
          <Title level={3} className='home-title'>
            Top 10 Cryptocurrencies in the world
          </Title>
          <Title level={5} className='show-more'>
            <Link to='/cryptocurrencies'>
              <Tooltip title='Show more'>
                <EllipsisOutlined style={{fontSize:'24px'}}/>
              </Tooltip>
            </Link>
          </Title>
        </div>
        <Cryptocurrencies simplified={true}/>
        <div className='home-heading-container'>
          <Title level={3} className='home-title'>
            Latest Crypto News
          </Title>
          <Title level={5} className='show-more'>
            <Link to='/news'>
              <Tooltip title='Show more'>
                <EllipsisOutlined style={{fontSize:'24px'}}/>
              </Tooltip>
            </Link>
          </Title>
        </div>
        <News simplified/>
       </>
    }
    </div>
  )
}

export default HomePage