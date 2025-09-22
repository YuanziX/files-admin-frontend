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

export const GET_USERS_QUERY = graphql(`
  query GetUsers($limit: Int, $pageNo: Int) {
    getUsers(limit: $limit, pageNo: $pageNo) {
      users {
        id
        name
        email
        role
        createdAt
      }
      pagination {
        count: Int!
        totalCount: Int!
        pageNo: Int!
        totalPages: Int!
        limit: Int!
      }
    }
  }
`);

export const GET_USER_USAGE_STATS_QUERY = graphql(`
  query GetUsageStatsByUser {
    totalStorageUsed
    actualStorageUsed
  }
`);
