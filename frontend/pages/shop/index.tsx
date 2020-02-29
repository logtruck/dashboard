import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Row, Col } from 'react-flexbox-grid';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import Container from '../../components/UiElements/Container/Container';
import PageTitle from '../../components/UiElements/PageTitle/PageTitle';
import ProductCard from '../../components/UiElements/ProductCard/ProductCard';
import { withApollo } from '../../apollo/client';

const GET_PRODUCTS = gql`
  query getProducts($limit: Int, $offset: Int) {
    products(limit: $limit, offset: $offset) {
      items {
        id
        name
        slug
        price
        thumbnail
      }
      total
      hasMore
    }
  }
`;

const TITLE = 'Shopping Store';
const SUB_TITLE = 'Awesome GitHub T-shirts and other cool swag';

const Shop: NextPage<{}> = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_PRODUCTS, {
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  if (!data) return null;
  const { items, total } = data.products;

  function loadMore() {
    fetchMore({
      variables: {
        offset: data.products.items.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          products: {
            __typename: prev.products.__typename,
            items: [...prev.products.items, ...fetchMoreResult.products.items],
            hasMore: fetchMoreResult.products.hasMore,
          },
        });
      },
    });
  }

  return (
    <>
      <Head>
        <title>Shop | INST.</title>
        <meta name="Description" content="Inst shop page" />
      </Head>

      <PageTitle title={TITLE} subtitle={SUB_TITLE} />

      <Container>
        <Block paddingBottom="20px">
          <img
            src={require('../../assets/images/shop-banner.png')}
            width="100%"
            alt="Banner"
          />
        </Block>

        <Row>
          {items.map((item: any) => (
            <Col sm={6} md={4} key={`product-key${item.id}`}>
              <ProductCard
                href={`/shop/[slug]`}
                as={`/shop/${item.slug}`}
                thumb={item.thumbnail}
                title={item.name}
                price={item.price}
              />
            </Col>
          ))}
        </Row>

        <Block
          paddingTop={['30px', '30px', '40px', '50px']}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {total > items.length ? (
            <Button
              isLoading={loading}
              onClick={loadMore}
              kind="secondary"
              size="large"
              overrides={{
                BaseButton: {
                  style: ({ $theme }) => {
                    return {
                      ...$theme.typography.font250,
                    };
                  },
                },
              }}
            >
              Load more {total - items.length} products
            </Button>
          ) : (
            'No more product'
          )}
        </Block>
      </Container>
    </>
  );
};

export default withApollo(Shop);
