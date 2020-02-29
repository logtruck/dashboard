import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Row, Col } from 'react-flexbox-grid';
import PageTitle from '../components/UiElements/PageTitle/PageTitle';
import Container from '../components/UiElements/Container/Container';
import PricingCard from '../components/UiElements/PricingCard/PricingCard';

import pricingPageData from '../data/pricingPage';

const Pricing: NextPage<{}> = () => {
  const { title, subtitle, plans } = pricingPageData;
  const [loading, setLoading] = useState(false);
  const [pricingPlan, setPricingPlan] = useState('Free');

  const handlePricingPlan = (type: string) => {
    setLoading(true);
    setPricingPlan(type);

    setTimeout(() => {
      setLoading(false);
    }, 600);

    console.log('Selected plan', pricingPlan);
  };

  return (
    <>
      <Head>
        <title>{title} | INST.</title>
        <meta name="Description" content="Inst pricing plan page" />
      </Head>

      <PageTitle title={title} subtitle={subtitle} />

      <Container>
        <Row>
          {plans.map(plan => (
            <Col
              md={4}
              style={{ display: 'flex', marginBottom: '30px' }}
              key={`pricing-plan--key${plan.id}`}
            >
              <PricingCard
                title={plan.title}
                type={plan.type}
                items={plan.items}
                price={plan.price}
                btn={plan.btnText}
                isLoading={loading && pricingPlan === plan.type}
                onClick={() => handlePricingPlan(plan.type)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Pricing;
