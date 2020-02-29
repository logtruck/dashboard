import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { IoLogoFacebook, IoLogoTwitter } from "react-icons/io";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import Container from "../components/UiElements/Container/Container";
import { useForm } from "react-hook-form";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Select } from "baseui/select";
import { useState, useEffect } from "react";
// import { auth } from "../firebase/initialize";
import { useAuth } from "../utils/useAuth";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../apollo/client";

const CREATE_USER = gql`
  mutation createUser(
    $uid: String!
    $email: String!
    $name: String!
    $company: String!
  ) {
    createUser(
      data: {
        uid: $uid
        name: $name
        email: $email
        company: { create: { name: $company } }
      }
    ) {
      id
      name
      company {
        name
      }
    }
  }
`;

const Login: NextPage<{}> = () => {
  const { signup } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, setValue, errors } = useForm();
  const [createUser] = useMutation(CREATE_USER);

  const onSubmit = async data => {
    try {
      const firebaseUser = await signup(data.email, data.password);
      const dbUser = await createUser({
        variables: {
          uid: firebaseUser.user.uid,
          name: data.name,
          company: data.company,
          email: data.email
        }
      });
      if (
        dbUser &&
        dbUser.data &&
        dbUser.data.createUser &&
        dbUser.data.createUser.id
      ) {
        router.push("/");
      }
      console.log(dbUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Login | INST.</title>
        <meta name="Description" content="Inst login page" />
      </Head>

      <Container>
        <Block
          overrides={{
            Block: {
              style: {
                minHeight: "calc(100vh - 213px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }
            }
          }}
        >
          <Block
            as="h1"
            overrides={{
              Block: {
                style: ({ $theme }) => {
                  return {
                    ...$theme.typography.font1250,
                    fontWeight: 700,
                    marginBottom: "30px"
                  };
                }
              }
            }}
          >
            Register
          </Block>
          <Block width={["80%", "80%", "50%"]}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Block marginBottom="30px">
                <FormControl
                  label="Your Name"
                  caption="Please use 32 characters at maximum"
                  error={errors.name && "This field is required"}
                >
                  <Input
                    name="name"
                    inputRef={register({ required: true, maxLength: 32 })}
                    overrides={{
                      InputContainer: {
                        style: () => {
                          return { backgroundColor: "transparent" };
                        }
                      }
                    }}
                  />
                </FormControl>
              </Block>
              <Block marginBottom="30px">
                <FormControl
                  label="Company Name"
                  caption="Please use 32 characters at maximum"
                  error={errors.company && "This field is required"}
                >
                  <Input
                    name="company"
                    inputRef={register({ required: true, maxLength: 32 })}
                    overrides={{
                      InputContainer: {
                        style: () => {
                          return { backgroundColor: "transparent" };
                        }
                      }
                    }}
                  />
                </FormControl>
              </Block>

              <Block marginBottom="30px">
                <FormControl
                  label="Your Email"
                  caption="johndoe@demo.io"
                  error={errors.email && "Please enter a valid email address"}
                >
                  <Input
                    name="email"
                    inputRef={register({
                      required: true,
                      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    })}
                    overrides={{
                      InputContainer: {
                        style: () => {
                          return { backgroundColor: "transparent" };
                        }
                      }
                    }}
                  />
                </FormControl>
              </Block>
              <Block marginBottom="30px">
                <FormControl
                  label="Your Password"
                  caption="password"
                  error={errors.password && "Please enter a valid password"}
                >
                  <Input
                    type="password"
                    name="password"
                    inputRef={register({
                      required: true
                      // pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                    })}
                    overrides={{
                      InputContainer: {
                        style: () => {
                          return { backgroundColor: "transparent" };
                        }
                      }
                    }}
                  />
                </FormControl>
              </Block>

              <Button type="submit">Submit</Button>
            </form>
          </Block>
          {/*<Button
            onClick={() => router.push("/")}
            startEnhancer={() => <IoLogoFacebook size="1.25rem" />}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => {
                  return {
                    ...$theme.typography.font250,
                    width: "100%",
                    maxWidth: "260px",
                    borderTopLeftRadius: "4px",
                    borderTopRightRadius: "4px",
                    borderBottomLeftRadius: "4px",
                    borderBottomRightRadius: "4px",
                    marginTop: "10px",
                    justifyContent: "flex-start",
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    backgroundColor: "#4267B2",
                    transition: "all 0.3s ease",
                    ":hover": {
                      backgroundColor: "#4267B2",
                      opacity: 0.95
                    }
                  };
                }
              }
            }}
          >
            Continue with Facebook
          </Button>

          <Button
            onClick={() => router.push("/")}
            startEnhancer={() => <IoLogoTwitter size="1.25rem" />}
            overrides={{
              BaseButton: {
                style: ({ $theme }) => {
                  return {
                    ...$theme.typography.font250,
                    backgroundColor: "#1DA1F2",
                    width: "100%",
                    maxWidth: "260px",
                    borderTopLeftRadius: "4px",
                    borderTopRightRadius: "4px",
                    borderBottomLeftRadius: "4px",
                    borderBottomRightRadius: "4px",
                    marginTop: "10px",
                    justifyContent: "flex-start",
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    ":hover": {
                      backgroundColor: "#1DA1F2",
                      opacity: 0.95
                    }
                  };
                }
              }
            }}
          >
            Continue with Twitter
          </Button>*/}
        </Block>
      </Container>
    </>
  );
};

export default withApollo(Login);
