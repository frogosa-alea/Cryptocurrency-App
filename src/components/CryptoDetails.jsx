import React, { useState, useEffect } from 'react'
import HTMLReactParser from 'html-react-parser'
import millify from 'millify'
import { useParams } from 'react-router-dom'
import { Col, Row, Typography, Select, Space, Card, Divider, Avatar } from 'antd'
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined, TrophyOutlined,
  CheckOutlined, NumberOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import LineChart from './LineChart'
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi'

import { Loading } from './'
const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {

  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  // const [cryptoDetails, setCryptoDetails] = useState({})
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({coinId, timePeriod});
  console.log('data', data);
  const cryptoDetails = data?.data?.coin;
  console.log('useGetCryptoDetailsQuery',useGetCryptoDetailsQuery(coinId))
  console.log('useGetCryptoHistoryQuery', useGetCryptoHistoryQuery({coinId, timePeriod}))

  if(isFetching) return <Loading/>
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(Number(cryptoDetails.price))}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume',  value: `$ ${cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(Number(cryptoDetails.marketCap))}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${millify(Number((cryptoDetails?.allTimeHigh.price)))}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Change', value: cryptoDetails?.change, icon : <MoneyCollectOutlined/>},
    { title: 'Total Supply', value: `$ ${millify(Number((cryptoDetails?.supply.total)))}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${millify(Number((cryptoDetails?.supply.circulating)))}`, icon: <ExclamationCircleOutlined /> },
  ];
  return (
    <Col className='coin-detail-container'>
      <div style={{textAlign: 'center'}}>
      <img src={cryptoDetails?.iconUrl} style={{maxWidth: '80px', height: '80px'}}/>
      </div>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {`${cryptoDetails.name} (${cryptoDetails.symbol}) Price`}
        </Title>
        <p>
          {cryptoDetails.name} live price in US dollars.
          View value statistics, market cap, and supply.
        </p>
      </Col>
      <Space style={{alignItems: 'baseline', marginBottom: '10px'}}>
        <Title level={5}>Select Time Period</Title>
        <Select
          defaultValue='7d'
          className='select-timeperiod'
          placeholder='Select Time Period'
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((item) => (
            <Option key={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Space>
      <Card style={{borderRadius:'10px'}}>
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.price)}
          coinName={cryptoDetails.name}
        />
      </Card>
      <Divider/>
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {cryptoDetails.name}
            </p>
          </Col>
          {stats.map(({icon, title, value}) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Statistics
            </Title>
            <p>
              An overview showing the statistics of all cryptocurrencies
            </p>
          </Col>
          {genericStats.map(({icon, title, value}) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
            <Title level={3} className='coin-details-heading'>
              What is {cryptoDetails?.name}
            </Title>
            <p>
              {HTMLReactParser(cryptoDetails.description)}
            </p>
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>{cryptoDetails.name} Link</Title>
          {cryptoDetails.links.map((link) => (
            <Row className='coin-link' key={link.name}>
              <Title level={5} className='link-name'>
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel='noreferrer'>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails