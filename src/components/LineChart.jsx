import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography} from 'antd'

// const { Title } = Typography

const LineChart = ({
    coinHistory,
    currentPrice,
    coinName
}) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let index = 0; index < coinHistory?.data?.history.length; index+= 1) {
        coinPrice.push(coinHistory.data.history[index].price);
        coinTimestamp.push(new Date(coinHistory.data.history[index].timestamp * 1000).toLocaleDateString());
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071BD',
                borderColor: '#0071BD'
            }
        ]
    }

    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

  return (
    <>
        <Row className='chart-header'>
            <Typography.Title level={2} className='chart-title'>
                {coinName} Price Chart
            </Typography.Title>
            <Col className='price-container'>
                <Typography.Title level={5} className='price-change'>
                    {coinHistory?.data?.change}
                </Typography.Title>
                <Typography.Title level={5} className='current-price'>
                    Current {coinName} Price: $ {currentPrice}
                </Typography.Title>
            </Col>
        </Row>
        <Line data={data} options={options}/>
    </>
  )
}

export default LineChart