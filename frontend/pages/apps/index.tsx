import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Row, Col } from 'react-flexbox-grid';
import { Block } from 'baseui/block';
import Container from '../../components/UiElements/Container/Container';
import AppsMenu from '../../components/SideMenu/AppsMenu';
import Calendar from '../../containers/Calendar';

const Apps: NextPage<{}> = () => {
  return (
    <>
      <Head>
        <title>Calendar | INST.</title>
        <meta name="Description" content="Inst calendar app" />
      </Head>

      <Container>
        <Block paddingTop={['15px', '20px', '30px', '40px']}>
          <Row>
            <Col lg={3}>
              <AppsMenu />
            </Col>
            <Col lg={9}>
              <Block
                paddingTop={['10px', '10px', 0]}
                minHeight="500px"
                height="100%"
                maxHeight="700px"
              >
                <Calendar />
              </Block>
            </Col>
          </Row>
        </Block>
      </Container>
    </>
  );
};

export default Apps;
