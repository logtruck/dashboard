const pricingPageData = {
  title: 'Pricing Plan',
  subtitle: 'INST. has three different pricing plan',
  plans: [
    {
      id: 1,
      title: 'Basic Support',
      type: 'Free',
      items: [
        {
          id: 1,
          title: 'Access to INST on spectrum',
        },
        {
          id: 2,
          title: 'Email support',
        },
      ],
      price: 'Free',
      btnText: 'Get Started',
    },
    {
      id: 2,
      title: 'Primary Support',
      type: 'Primary',
      items: [
        {
          id: 1,
          title: 'Access to INST on spectrum',
        },
        {
          id: 2,
          title: 'Email support',
        },
        {
          id: 3,
          title: 'Support reply within 8hrs',
        },
      ],
      price: '$699',
      btnText: 'Get Started',
    },
    {
      id: 3,
      title: 'Advance Pro Support',
      type: 'Advance',
      items: [
        {
          id: 1,
          title: 'Access to INST on spectrum',
        },
        {
          id: 2,
          title: 'Email support',
        },
        {
          id: 3,
          title: 'Support reply within 24hrs',
        },
      ],
      price: '$799',
      btnText: 'Get Started',
    },
  ],
};

export default pricingPageData;
