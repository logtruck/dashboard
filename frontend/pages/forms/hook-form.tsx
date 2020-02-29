import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Row, Col } from 'react-flexbox-grid';
import { Block } from 'baseui/block';
import { H4 } from 'baseui/typography';
import FormMenu from '../../components/SideMenu/FormMenu';
import Container from '../../components/UiElements/Container/Container';
import HookForm from '../../containers/HookForm/Form';
const ExampleHookForm: NextPage<{}> = () => {
  return (
    <>
      <Head>
        <title>React Hook Form | INST.</title>
        <meta name="Description" content="Inst react hook form" />
      </Head>

      <Container>
        <Block paddingTop={['15px', '20px', '30px', '40px']}>
          <Row>
            <Col lg={3}>
              <FormMenu />
            </Col>
            <Col lg={9}>
              <H4 marginBottom="30px">React Hook Form</H4>
              <HookForm />
            </Col>
          </Row>
        </Block>
      </Container>
    </>
  );
};

export default ExampleHookForm;
