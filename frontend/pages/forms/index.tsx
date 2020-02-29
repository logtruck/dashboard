import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Row, Col } from 'react-flexbox-grid';
import { Block } from 'baseui/block';
import { H4 } from 'baseui/typography';
import FormMenu from '../../components/SideMenu/FormMenu';
import Container from '../../components/UiElements/Container/Container';
import FormFormik from '../../containers/Formik/Form';
const Forms: NextPage<{}> = () => {
  return (
    <>
      <Head>
        <title>Forms | INST.</title>
        <meta name="Description" content="Inst forms" />
      </Head>

      <Container>
        <Block paddingTop={['15px', '20px', '30px', '40px']}>
          <Row>
            <Col lg={3}>
              <FormMenu />
            </Col>
            <Col lg={9}>
              <H4 marginBottom="30px">Formik Form</H4>
              <FormFormik />
            </Col>
          </Row>
        </Block>
      </Container>
    </>
  );
};

export default Forms;
