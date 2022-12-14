import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({simplified}) => {

  const count = simplified ? 10 : 100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchItem, setSearchItem] = useState('')
  console.log('cryptos',cryptos)
  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchItem))
    setCryptos(filteredData);

  }, [cryptosList, searchItem]);
  if(isFetching) return "Loading..."
  return (
    <>
      {!simplified &&
        <div className="search-crypto">
          <Input placeholder='Search Cryptocurrency' onChange={(e)=> setSearchItem(e.target.value)}/>
        </div>
      }
      <Row gutter={[32,32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col key={currency.id} sm={12} lg={6} className='crypto-card'>
            <Link to={`/crypto/${currency.uuid}`}>
                <Card
                  headStyle={{backgroundColor:'#001529', color:'#FFFFFF', borderRadius:'10px'}}
                  title={`${currency.rank}. ${currency.name}`}
                  extra={<img className='crypto-image' src={currency.iconUrl}/>}
                  hoverable
                  style={{
                    borderRadius:'10px'
                  }}
                >
                  <p>Price: {millify(currency.price)}</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Daily Change: {millify(currency.change)}</p>
                </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies