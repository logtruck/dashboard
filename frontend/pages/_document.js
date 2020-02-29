import Document, { Head, Main, NextScript } from 'next/document';
import { Provider as StyletronProvider } from 'styletron-react';
import { styletron } from '../styletron';

class MyDocument extends Document {
  static getInitialProps(props) {
    const page = props.renderPage(App => props => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ));
    const stylesheets = styletron.getStylesheets() || [];
    return { ...page, stylesheets };
  }

  render() {
    return (
      <html>
        <Head>
          <meta name="theme-color" content="#000000" />
          <meta
            name="Description"
            content="Inst is a GraphQL based server side dashboard template"
          />
          <link
            rel="icon"
            href={require('../assets/images/favicon.png')}
            type="image/png"
            sizes="16x16"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800&display=swap"
            rel="stylesheet"
          />
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
        </Head>
        <body dir="ltr">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
