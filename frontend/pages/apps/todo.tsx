import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Row, Col } from 'react-flexbox-grid';
import { Block } from 'baseui/block';
import Container from '../../components/UiElements/Container/Container';
import AppsMenu from '../../components/SideMenu/AppsMenu';

/**
 * Note: React Beautiful DND needs custom ssr configuration
 */
const DynamicTodoWithNoSSR = dynamic(
  () => import('../../containers/Todo/TodoTabs'),
  { ssr: false }
);

const Todo: NextPage<{}> = () => {
  return (
    <>
      <Head>
        <title>Todo | INST.</title>
        <meta name="Description" content="Inst todo app" />
      </Head>

      <Container>
        <Block paddingTop={['15px', '20px', '30px', '40px']}>
          <Row>
            <Col lg={3}>
              <AppsMenu />
            </Col>
            <Col lg={9}>
              <Block paddingTop={['10px', '10px', 0]}>
                <DynamicTodoWithNoSSR />
              </Block>
            </Col>
          </Row>
        </Block>
      </Container>
    </>
  );
};

export default Todo;
