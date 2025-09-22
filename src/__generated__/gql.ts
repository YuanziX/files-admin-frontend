/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation Login($email: String!, $password: String!) {\n    login(input: { email: $email, password: $password }) {\n      user {\n        name\n      }\n      token\n    }\n  }\n": typeof types.LoginDocument,
    "\n  query GetFiles($limit: Int, $pageNo: Int) {\n    getFiles(limit: $limit, pageNo: $pageNo) {\n      files {\n        id\n        ownerID\n        filename\n        mimeType\n        size\n        uploadDate\n        downloadCount\n      }\n      pagination {\n        count\n        totalCount\n        pageNo\n        totalPages\n        limit\n      }\n    }\n  }\n": typeof types.GetFilesDocument,
    "\n  query DownloadFile($fileID: ID!) {\n    downloadFile(fileID: $fileID) {\n      url\n      filename\n    }\n  }\n": typeof types.DownloadFileDocument,
    "\n  query GetUserByID($userID: ID!) {\n    getUserByID(userID: $userID) {\n      id\n      name\n      email\n      role\n      createdAt\n    }\n  }\n": typeof types.GetUserByIdDocument,
    "\n  query GetUsers($limit: Int, $pageNo: Int) {\n    getUsers(limit: $limit, pageNo: $pageNo) {\n      users {\n        id\n        name\n        email\n        role\n        createdAt\n      }\n      pagination {\n        count\n        totalCount\n        pageNo\n        totalPages\n        limit\n      }\n    }\n  }\n": typeof types.GetUsersDocument,
    "\n  query GetUsageStatsByUser($userID: ID!) {\n    getUsageStatsByUser(userID: $userID) {\n      totalStorageUsed\n      actualStorageUsed\n    }\n  }\n": typeof types.GetUsageStatsByUserDocument,
};
const documents: Documents = {
    "\n  mutation Login($email: String!, $password: String!) {\n    login(input: { email: $email, password: $password }) {\n      user {\n        name\n      }\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  query GetFiles($limit: Int, $pageNo: Int) {\n    getFiles(limit: $limit, pageNo: $pageNo) {\n      files {\n        id\n        ownerID\n        filename\n        mimeType\n        size\n        uploadDate\n        downloadCount\n      }\n      pagination {\n        count\n        totalCount\n        pageNo\n        totalPages\n        limit\n      }\n    }\n  }\n": types.GetFilesDocument,
    "\n  query DownloadFile($fileID: ID!) {\n    downloadFile(fileID: $fileID) {\n      url\n      filename\n    }\n  }\n": types.DownloadFileDocument,
    "\n  query GetUserByID($userID: ID!) {\n    getUserByID(userID: $userID) {\n      id\n      name\n      email\n      role\n      createdAt\n    }\n  }\n": types.GetUserByIdDocument,
    "\n  query GetUsers($limit: Int, $pageNo: Int) {\n    getUsers(limit: $limit, pageNo: $pageNo) {\n      users {\n        id\n        name\n        email\n        role\n        createdAt\n      }\n      pagination {\n        count\n        totalCount\n        pageNo\n        totalPages\n        limit\n      }\n    }\n  }\n": types.GetUsersDocument,
    "\n  query GetUsageStatsByUser($userID: ID!) {\n    getUsageStatsByUser(userID: $userID) {\n      totalStorageUsed\n      actualStorageUsed\n    }\n  }\n": types.GetUsageStatsByUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(input: { email: $email, password: $password }) {\n      user {\n        name\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(input: { email: $email, password: $password }) {\n      user {\n        name\n      }\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFiles($limit: Int, $pageNo: Int) {\n    getFiles(limit: $limit, pageNo: $pageNo) {\n      files {\n        id\n        ownerID\n        filename\n        mimeType\n        size\n        uploadDate\n        downloadCount\n      }\n      pagination {\n        count\n        totalCount\n        pageNo\n        totalPages\n        limit\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFiles($limit: Int, $pageNo: Int) {\n    getFiles(limit: $limit, pageNo: $pageNo) {\n      files {\n        id\n        ownerID\n        filename\n        mimeType\n        size\n        uploadDate\n        downloadCount\n      }\n      pagination {\n        count\n        totalCount\n        pageNo\n        totalPages\n        limit\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DownloadFile($fileID: ID!) {\n    downloadFile(fileID: $fileID) {\n      url\n      filename\n    }\n  }\n"): (typeof documents)["\n  query DownloadFile($fileID: ID!) {\n    downloadFile(fileID: $fileID) {\n      url\n      filename\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserByID($userID: ID!) {\n    getUserByID(userID: $userID) {\n      id\n      name\n      email\n      role\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetUserByID($userID: ID!) {\n    getUserByID(userID: $userID) {\n      id\n      name\n      email\n      role\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsers($limit: Int, $pageNo: Int) {\n    getUsers(limit: $limit, pageNo: $pageNo) {\n      users {\n        id\n        name\n        email\n        role\n        createdAt\n      }\n      pagination {\n        count\n        totalCount\n        pageNo\n        totalPages\n        limit\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUsers($limit: Int, $pageNo: Int) {\n    getUsers(limit: $limit, pageNo: $pageNo) {\n      users {\n        id\n        name\n        email\n        role\n        createdAt\n      }\n      pagination {\n        count\n        totalCount\n        pageNo\n        totalPages\n        limit\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUsageStatsByUser($userID: ID!) {\n    getUsageStatsByUser(userID: $userID) {\n      totalStorageUsed\n      actualStorageUsed\n    }\n  }\n"): (typeof documents)["\n  query GetUsageStatsByUser($userID: ID!) {\n    getUsageStatsByUser(userID: $userID) {\n      totalStorageUsed\n      actualStorageUsed\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;