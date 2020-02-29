import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Row, Col } from 'react-flexbox-grid';
import { Block } from 'baseui/block';
import Container from '../../components/UiElements/Container/Container';
import AppsMenu from '../../components/SideMenu/AppsMenu';
import FirebaseCrud from '../../containers/Crud/Crud';
const TITLE = 'Firebase CRUD';
const SUB_TITLE =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod';
const FirebaseCRUD: NextPage<{}> = () => {
  return (
    <>
      <Head>
        <title>{TITLE} | INST.</title>
        <meta name="Description" content={SUB_TITLE} />
      </Head>

      <Container>
        <Block paddingTop={['15px', '20px', '30px', '40px']}>
          <Row>
            <Col lg={3}>
              <AppsMenu />
            </Col>
            <Col lg={9}>
              <FirebaseCrud />
            </Col>
          </Row>
        </Block>
      </Container>
    </>
  );
};

export default FirebaseCRUD;
