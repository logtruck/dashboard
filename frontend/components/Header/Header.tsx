import React from "react";
import DefaultHeader from "./DefaultHeader/DefaultHeader";
import MobileHeader from "./MobileHeader/MobileHeader";
import HeaderWrapper, { HideInMobile, ShowInMobile } from "./Header.styled";
import gql from "graphql-tag";

import { useAuth } from "../../utils/useAuth";

import { useQuery } from "@apollo/react-hooks";

const GET_USERS = gql`
  query allUsers($uid: String!) {
    allUsers(where: { uid: $uid }) {
      id
      name
      company {
        name
      }
    }
  }
`;
const Header: React.FC<{}> = () => {
  const { user } = useAuth();
  const { data, error, loading } = useQuery(GET_USERS, {
    variables: {
      uid: user?.uid
    },
    skip: !user
  });
  console.log(user, data);
  return (
    <HeaderWrapper>
      <HideInMobile>
        <DefaultHeader />
      </HideInMobile>
      <ShowInMobile>
        <MobileHeader />
      </ShowInMobile>
    </HeaderWrapper>
  );
};

export default Header;
