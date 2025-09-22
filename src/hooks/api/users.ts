import { graphql } from "@/__generated__";

export const GET_USER_BY_ID_QUERY = graphql(`
  query GetUserByID($userID: ID!) {
    getUserByID(userID: $userID) {
      id
      name
      email
      role
      createdAt
    }
  }
`);
