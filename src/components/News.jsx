import React, {useState} from 'react'
import { Select, Row, Col, Typography, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'

import { Loading } from './'
const { Text, Title } = Typography;
const { Option } = Select

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'
const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')

  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: newsCategory, count: simplified ? 6 : 12})
  const { data: cryptosList } = useGetCryptosQuery(100)

  if(!cryptoNews) return <Loading/>
  return (
    <Row gutter={[24,24]}>
      {!simplified &&
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder="Select a Crypto"
            optionFilterProp='children'
            onChange={(value)=> setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {cryptosList?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      }

      {cryptoNews?.value?.map((news, index) => (
        <Col key={index} xs={24} sm={12} lg={12}>
          <Card
            hoverable
            className='news-card'
            style={{
              borderRadius:'10px'
            }}
          >
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className='news-title' level={4}>
                  {news.name}
                </Title>
                <img
                  alt='news'
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  style={{maxWidth:'200px', maxHeight:'100px'}}
                />
              </div>
              <p>
                {news.description > 100 ?
                  `${news.description.substring(0,100)}...`
                : news.description
                }
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar
                    alt='news'
                    src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                  />
                  <Text className='provider-name'>
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf('ss').fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))

      }
    </Row>
  )
}

export default News