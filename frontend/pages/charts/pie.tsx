import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Row, Col } from 'react-flexbox-grid';
import { Block } from 'baseui/block';
import Container from '../../components/UiElements/Container/Container';
import ChartMenu from '../../components/SideMenu/ChartMenu';
import ApexChart from '../../components/UiElements/ApexChart/ApexChart';

const Pie: NextPage<{}> = () => {
  const [state, setState] = useState<any>({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      title: {
        text: 'Pie Chart',
        align: 'left',
      },
      labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  });

  return (
    <>
      <Head>
        <title>Chart | INST.</title>
        <meta name="Description" content="Inst chart app" />
      </Head>

      <Container>
        <Block paddingTop={['15px', '20px', '30px', '40px']}>
          <Row>
            <Col lg={3}>
              <ChartMenu />
            </Col>
            <Col lg={9}>
              <Block paddingTop={['10px', '10px', 0]}>
                <ApexChart
                  options={state.options}
                  series={state.series}
                  type="pie"
                  height={420}
                />
              </Block>
            </Col>
          </Row>
        </Block>
      </Container>
    </>
  );
};

export default Pie;
