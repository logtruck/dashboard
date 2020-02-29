import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/react-hooks';
import { Row, Col } from 'react-flexbox-grid';
import { Block } from 'baseui/block';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Select } from 'baseui/select';
import { Datepicker } from 'baseui/datepicker';
import { Button } from 'baseui/button';
import Container from '../../../components/UiElements/Container/Container';
import AppsMenu from '../../../components/SideMenu/AppsMenu';
import InvoiceItemTable from './InvoiceItemTable';
import gql from 'graphql-tag';
import { withApollo } from '../../../apollo/client';
import uuidV4 from 'uuid/v4';

const ADD_INVOICE = gql`
  mutation CreateInvoice($invoice: AddInvoiceInput!) {
    createInvoice(data: $invoice) {
      id
      name
      customer {
        id
        name
        address
      }
      vendor {
        id
        name
        address
      }
      # items
      total
      status
      createdAt
    }
  }
`;

const GET_INVOICES = gql`
  query {
    invoices {
      id
      name
      customer {
        id
        name
        address
      }
      vendor {
        id
        name
        address
      }
      items {
        id
        name
        unitPrice
      }
      total
      status
      createdAt
    }
  }
`;

const statusOptions = [
  { label: 'Pending', id: 'pending' },
  { label: 'Shipped', id: 'shipped' },
  { label: 'Delivered', id: 'delivered' },
];

function calcLineItemsTotal(lineItems: any) {
  return lineItems.reduce(
    (prev: any, cur: any) => prev + cur.unit * cur.unitPrice,
    0
  );
}

const AddInvoice: NextPage<{}> = () => {
  const [createInvoice] = useMutation(ADD_INVOICE, {
    update(cache, { data: { createInvoice } }) {
      const { invoices } = cache.readQuery<any>({ query: GET_INVOICES });
      cache.writeQuery({
        query: GET_INVOICES,
        data: { invoices: invoices.concat([createInvoice]) },
      });
    },
  });

  const router = useRouter();
  const [formState, setFormState] = useState<any>({
    invoiceInfo: '',
    orderStatus: [],
    orderDate: null,
    billTo: '',
    billForm: '',
    billToAddress: '',
    billFormAddress: '',
  });

  const [lineItems, setLineItems] = React.useState([
    {
      id: 1,
      name: '',
      unitPrice: 0,
      unit: 1,
    },
  ]);

  const handleAddLineItem = () => {
    let idList = lineItems.map(a => a.id);
    let newId = Math.max(...idList) + 1;
    setLineItems(prev =>
      prev.concat([
        {
          id: newId,
          name: '',
          unitPrice: 0,
          unit: 1,
        },
      ])
    );
  };

  const handleLineItemChange = (elementIndex: any) => (event: any) => {
    let updatedLineItems = lineItems.map((item, i) => {
      if (elementIndex !== i) return item;
      return { ...item, [event.target.name]: event.target.value };
    });
    setLineItems(updatedLineItems);
  };

  const handleRemoveLineItem = (elementIndex: any) => (event: any) => {
    setLineItems(
      lineItems.filter((item, i) => {
        return elementIndex !== i;
      })
    );
  };

  const handleOnChange = (name: string) => (e: any) => {
    let value: any;
    if (name === 'orderStatus') {
      value = e.value;
    } else if (name === 'orderDate') {
      value = e.date;
    } else {
      value = e.target.value;
    }
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  async function saveInvoice(e: any) {
    e.preventDefault();
    let invoice = {
      id: uuidV4(),
      name: formState.invoiceInfo,
      customer: {
        id: '13',
        name: formState.billTo,
        address: formState.billToAddress,
      },
      vendor: {
        id: '14',
        name: formState.billForm,
        address: formState.billFormAddress,
      },
      items: lineItems,
      total: calcLineItemsTotal(lineItems),
      status: formState?.orderStatus[0]?.id.toUpperCase(),
      createdAt: formState.orderDate,
    };
    console.log(invoice, 'newInvoice');
    await createInvoice({ variables: { invoice: invoice } });
    router.push('/apps/invoice');
  }

  return (
    <>
      <Head>
        <title>Add Invoice | INST.</title>
        <meta name="Description" content="Inst create a invoice" />
      </Head>

      <Container>
        <Block paddingTop={['15px', '20px', '30px', '40px']}>
          <Row>
            <Col lg={3}>
              <AppsMenu />
            </Col>
            <Col lg={9}>
              <form onSubmit={saveInvoice}>
                <Row>
                  <Col md={6}>
                    <FormControl
                      label="Invoice Info"
                      overrides={{
                        Label: {
                          style: ({ $theme }) => {
                            return { ...$theme.typography.font350 };
                          },
                        },
                      }}
                    >
                      <Input
                        value={formState.invoiceInfo}
                        onChange={handleOnChange('invoiceInfo')}
                        required={true}
                        overrides={{
                          InputContainer: {
                            style: () => {
                              return { backgroundColor: 'transparent' };
                            },
                          },
                        }}
                      />
                    </FormControl>
                  </Col>

                  <Col md={6}></Col>

                  <Col md={6}>
                    <FormControl
                      label="Order Status"
                      overrides={{
                        Label: {
                          style: ({ $theme }) => {
                            return { ...$theme.typography.font350 };
                          },
                        },
                      }}
                    >
                      <Select
                        options={statusOptions}
                        value={formState.orderStatus}
                        placeholder=""
                        required={true}
                        onChange={handleOnChange('orderStatus')}
                        overrides={{
                          ControlContainer: {
                            style: () => {
                              return { backgroundColor: 'transparent' };
                            },
                          },
                        }}
                      />
                    </FormControl>
                  </Col>

                  <Col md={6}>
                    <FormControl
                      label="Order Date"
                      overrides={{
                        Label: {
                          style: ({ $theme }) => {
                            return { ...$theme.typography.font350 };
                          },
                        },
                      }}
                    >
                      <Datepicker
                        value={formState.orderDate}
                        required={true}
                        onChange={handleOnChange('orderDate')}
                      />
                    </FormControl>
                  </Col>

                  <Col md={6}>
                    <FormControl
                      label="Bill To"
                      overrides={{
                        Label: {
                          style: ({ $theme }) => {
                            return { ...$theme.typography.font350 };
                          },
                        },
                      }}
                    >
                      <Input
                        value={formState.billTo}
                        onChange={handleOnChange('billTo')}
                        required={true}
                        overrides={{
                          InputContainer: {
                            style: () => {
                              return { backgroundColor: 'transparent' };
                            },
                          },
                        }}
                      />
                    </FormControl>
                  </Col>

                  <Col md={6}>
                    <FormControl
                      label="Bill Form"
                      overrides={{
                        Label: {
                          style: ({ $theme }) => {
                            return { ...$theme.typography.font350 };
                          },
                        },
                      }}
                    >
                      <Input
                        value={formState.billForm}
                        onChange={handleOnChange('billForm')}
                        required={true}
                        overrides={{
                          InputContainer: {
                            style: () => {
                              return { backgroundColor: 'transparent' };
                            },
                          },
                        }}
                      />
                    </FormControl>
                  </Col>

                  <Col md={6}>
                    <FormControl
                      label="Bill To Address"
                      overrides={{
                        Label: {
                          style: ({ $theme }) => {
                            return { ...$theme.typography.font350 };
                          },
                        },
                      }}
                    >
                      <Input
                        value={formState.billToAddress}
                        onChange={handleOnChange('billToAddress')}
                        required={true}
                        overrides={{
                          InputContainer: {
                            style: () => {
                              return { backgroundColor: 'transparent' };
                            },
                          },
                        }}
                      />
                    </FormControl>
                  </Col>

                  <Col md={6}>
                    <FormControl
                      label="Bill Form Address"
                      overrides={{
                        Label: {
                          style: ({ $theme }) => {
                            return { ...$theme.typography.font350 };
                          },
                        },
                      }}
                    >
                      <Input
                        value={formState.billFormAddress}
                        onChange={handleOnChange('billFormAddress')}
                        required={true}
                        overrides={{
                          InputContainer: {
                            style: () => {
                              return { backgroundColor: 'transparent' };
                            },
                          },
                        }}
                      />
                    </FormControl>
                  </Col>

                  <Col md={12}>
                    <InvoiceItemTable
                      items={lineItems}
                      onAddItem={handleAddLineItem}
                      onItemInputChange={handleLineItemChange}
                      onRemove={handleRemoveLineItem}
                    />
                  </Col>

                  <Col md={12}>
                    <Block marginTop={'25px'}>
                      <Button
                        type="submit"
                        overrides={{
                          BaseButton: {
                            style: ({ $theme }) => {
                              return {
                                ...$theme.typography.font250,
                                minWidth: '130px',
                              };
                            },
                          },
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        kind="minimal"
                        type="button"
                        overrides={{
                          BaseButton: {
                            style: ({ $theme }) => {
                              return {
                                ...$theme.typography.font250,
                                minWidth: '130px',
                              };
                            },
                          },
                        }}
                        onClick={() => router.push('/apps/invoice')}
                      >
                        Cancel
                      </Button>
                    </Block>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Block>
      </Container>
    </>
  );
};

export default withApollo(AddInvoice);
