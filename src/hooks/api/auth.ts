import { graphql } from "@/__generated__";

export const LOGIN_MUTATION = graphql(`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      user {
        name
      }
      token
    }
  }
`);
