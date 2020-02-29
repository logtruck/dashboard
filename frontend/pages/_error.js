import React from 'react';
import Head from 'next/head';
import Container from '../components/UiElements/Container/Container';
import NotFound from '../components/UiElements/NotFound/NotFound';

class Error extends React.Component {
  static async getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <>
        <Head>
          <title>404: Not found</title>
        </Head>
        <div>
          {this.props.statusCode ? (
            `An error ${this.props.statusCode} occurred on server`
          ) : (
            <Container>
              <NotFound />
            </Container>
          )}
        </div>
      </>
    );
  }
}

export default Error;
