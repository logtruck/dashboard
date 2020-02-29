import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { Row, Col } from 'react-flexbox-grid';
import { Block } from 'baseui/block';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { useForm } from 'react-hook-form';
import Container from '../../components/UiElements/Container/Container';
import SettingsMenu from '../../components/SideMenu/SettingsMenu';
import { ButtonGroup } from '../../components/PageStyles/Settings.styled';

type FormData = {
  newPassword: string;
  confirmPassword: string;
};

const Password: NextPage<{}> = () => {
  const { register, setValue, handleSubmit, reset, errors } = useForm<
    FormData
  >();
  const [feedback, setFeedback] = useState(false);
  const [state, setState] = useState<FormData>({
    newPassword: '',
    confirmPassword: '',
  });

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleOnSubmit = handleSubmit(data => {
    if (state.newPassword === state.confirmPassword) {
      setFeedback(false);
      console.log('Form data: ', data);
      alert(JSON.stringify(data, null, 4));
    } else {
      setFeedback(true);
    }
  });

  const handleOnReset = () => {
    setState({ newPassword: '', confirmPassword: '' });
    reset();
  };

  return (
    <>
      <Head>
        <title>Password | INST.</title>
        <meta name="Description" content="Inst password setting page" />
      </Head>

      <Container>
        <Block paddingTop={['15px', '20px', '30px', '40px']}>
          <Row>
            <Col lg={3}>
              <SettingsMenu />
            </Col>
            <Col lg={9}>
              <form onSubmit={handleOnSubmit}>
                <Block marginBottom="30px">
                  <FormControl
                    label="Set New Password"
                    caption="Please use 20 characters at maximum"
                    overrides={{
                      Label: {
                        style: ({ $theme }) => {
                          return { ...$theme.typography.font350 };
                        },
                      },
                    }}
                  >
                    <Input
                      type="password"
                      name="newPassword"
                      value={state.newPassword}
                      onChange={handleOnChange}
                      inputRef={register({ required: true, maxLength: 20 })}
                      overrides={{
                        InputContainer: {
                          style: () => {
                            return { backgroundColor: 'transparent' };
                          },
                        },
                      }}
                    />
                  </FormControl>
                </Block>

                <Block marginBottom="30px">
                  <FormControl
                    label="Confirm Password"
                    caption="Please enter same password"
                    error={feedback && 'Password is not matching'}
                    overrides={{
                      Label: {
                        style: ({ $theme }) => {
                          return { ...$theme.typography.font350 };
                        },
                      },
                    }}
                  >
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={state.confirmPassword}
                      onChange={handleOnChange}
                      inputRef={register({ required: true, maxLength: 20 })}
                      overrides={{
                        InputContainer: {
                          style: () => {
                            return { backgroundColor: 'transparent' };
                          },
                        },
                      }}
                    />
                  </FormControl>
                </Block>

                <ButtonGroup>
                  <Button
                    type="submit"
                    size="large"
                    overrides={{
                      BaseButton: {
                        style: ({ $theme }) => {
                          return {
                            width: '131px',
                            ...$theme.typography.font250,
                          };
                        },
                      },
                    }}
                  >
                    Change
                  </Button>
                  <Button
                    type="reset"
                    kind="tertiary"
                    size="large"
                    onClick={handleOnReset}
                    overrides={{
                      BaseButton: {
                        style: ({ $theme }) => {
                          return {
                            width: '131px',
                            ...$theme.typography.font250,
                          };
                        },
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </form>
            </Col>
          </Row>
        </Block>
      </Container>
    </>
  );
};

export default Password;
