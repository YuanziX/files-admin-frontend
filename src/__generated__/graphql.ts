/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: any; output: any; }
};

export type AdminFile = {
  __typename?: 'AdminFile';
  downloadCount: Scalars['Int']['output'];
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  ownerID: Scalars['ID']['output'];
  size: Scalars['Int']['output'];
  uploadDate: Scalars['Time']['output'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type ConfirmUploadInput = {
  filename: Scalars['String']['input'];
  folderId?: InputMaybe<Scalars['ID']['input']>;
  hash: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
  size: Scalars['Int']['input'];
};

export type ConfirmUploadsResponse = {
  __typename?: 'ConfirmUploadsResponse';
  failedUploads: Array<FailedUpload>;
  files: Array<File>;
};

export type DownloadFileResponse = {
  __typename?: 'DownloadFileResponse';
  filename: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type DownloadUrl = {
  __typename?: 'DownloadURL';
  downloadURL: Scalars['String']['output'];
  filename: Scalars['String']['output'];
};

export type FailedUpload = {
  __typename?: 'FailedUpload';
  hash: Scalars['String']['output'];
  reason: Scalars['String']['output'];
};

export type File = {
  __typename?: 'File';
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  uploadDate: Scalars['Time']['output'];
};

export type FileFilterInput = {
  filename?: InputMaybe<Scalars['String']['input']>;
  maxSize?: InputMaybe<Scalars['Int']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  minSize?: InputMaybe<Scalars['Int']['input']>;
  uploadedAfter?: InputMaybe<Scalars['Time']['input']>;
  uploadedBefore?: InputMaybe<Scalars['Time']['input']>;
};

export enum FileSortField {
  Filename = 'FILENAME',
  MimeType = 'MIME_TYPE',
  Size = 'SIZE',
  UploadDate = 'UPLOAD_DATE'
}

export type FileSortInput = {
  field: FileSortField;
  order: SortOrder;
};

export type Folder = {
  __typename?: 'Folder';
  childrenFiles: Array<File>;
  childrenFolders: Array<Folder>;
  createdAt: Scalars['Time']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentID?: Maybe<Scalars['ID']['output']>;
  path: Scalars['String']['output'];
  realPath: Scalars['String']['output'];
};

export type FolderFilterInput = {
  createdAfter?: InputMaybe<Scalars['Time']['input']>;
  createdBefore?: InputMaybe<Scalars['Time']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum FolderSortField {
  CreatedAt = 'CREATED_AT',
  Name = 'NAME'
}

export type FolderSortInput = {
  field: FolderSortField;
  order: SortOrder;
};

export type GetFilesResponse = {
  __typename?: 'GetFilesResponse';
  files: Array<AdminFile>;
  pagination: Pagination;
};

export type GetUsersResponse = {
  __typename?: 'GetUsersResponse';
  pagination: Pagination;
  users: Array<User>;
};

export type LoginUser = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmUploads: ConfirmUploadsResponse;
  createAdminUser: Scalars['String']['output'];
  createFolder: Folder;
  deleteFile: Scalars['Boolean']['output'];
  deleteFolder: Scalars['Boolean']['output'];
  getDownloadURL: DownloadUrl;
  login: AuthResponse;
  preUploadCheck: PreUploadCheckResponse;
  registerUser: AuthResponse;
  revokePubliclyShared: Scalars['Boolean']['output'];
  shareFilePublic: Scalars['String']['output'];
  shareFileWithUser: Scalars['ID']['output'];
  shareFolderPublic: Scalars['String']['output'];
  shareFolderWithUser: Scalars['ID']['output'];
  unshareFileWithUser: Scalars['Boolean']['output'];
  unshareFolderWithUser: Scalars['Boolean']['output'];
};


export type MutationConfirmUploadsArgs = {
  uploads: Array<ConfirmUploadInput>;
};


export type MutationCreateAdminUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateFolderArgs = {
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteFileArgs = {
  fileId: Scalars['ID']['input'];
};


export type MutationDeleteFolderArgs = {
  folderId: Scalars['ID']['input'];
};


export type MutationGetDownloadUrlArgs = {
  fileId: Scalars['ID']['input'];
  publicToken?: InputMaybe<Scalars['String']['input']>;
};


export type MutationLoginArgs = {
  input: LoginUser;
};


export type MutationPreUploadCheckArgs = {
  files: Array<PreUploadFileInput>;
};


export type MutationRegisterUserArgs = {
  input: RegisterUser;
};


export type MutationRevokePubliclySharedArgs = {
  publicToken: Scalars['ID']['input'];
};


export type MutationShareFilePublicArgs = {
  fileId: Scalars['ID']['input'];
};


export type MutationShareFileWithUserArgs = {
  email: Scalars['String']['input'];
  fileId: Scalars['ID']['input'];
};


export type MutationShareFolderPublicArgs = {
  folderId: Scalars['ID']['input'];
};


export type MutationShareFolderWithUserArgs = {
  email: Scalars['String']['input'];
  folderId: Scalars['ID']['input'];
};


export type MutationUnshareFileWithUserArgs = {
  email: Scalars['String']['input'];
  fileId: Scalars['ID']['input'];
};


export type MutationUnshareFolderWithUserArgs = {
  email: Scalars['String']['input'];
  folderId: Scalars['ID']['input'];
};

export type Pagination = {
  __typename?: 'Pagination';
  count: Scalars['Int']['output'];
  limit: Scalars['Int']['output'];
  pageNo: Scalars['Int']['output'];
  totalCount: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PreSignedUrl = {
  __typename?: 'PreSignedURL';
  filename: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  uploadURL: Scalars['String']['output'];
};

export type PreUploadCheckResponse = {
  __typename?: 'PreUploadCheckResponse';
  completedFiles: Array<File>;
  newFiles: Array<PreSignedUrl>;
};

export type PreUploadFileInput = {
  filename: Scalars['String']['input'];
  folderId?: InputMaybe<Scalars['ID']['input']>;
  hash: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  downloadFile: DownloadFileResponse;
  getFile?: Maybe<File>;
  getFileShares: Array<Share>;
  getFiles: GetFilesResponse;
  getFilesInFolder: Array<File>;
  getFolderDetails?: Maybe<Folder>;
  getFolderShares: Array<Share>;
  getFoldersInFolder: Array<Folder>;
  getMyShares: Array<Share>;
  getUsageStatsByUser: UsageStat;
  getUserByID: User;
  getUsers: GetUsersResponse;
  me: User;
  searchFiles: Array<File>;
};


export type QueryDownloadFileArgs = {
  fileID: Scalars['ID']['input'];
};


export type QueryGetFileArgs = {
  fileId: Scalars['ID']['input'];
  publicToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetFileSharesArgs = {
  fileId: Scalars['ID']['input'];
};


export type QueryGetFilesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  pageNo?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetFilesInFolderArgs = {
  filter?: InputMaybe<FileFilterInput>;
  folderId?: InputMaybe<Scalars['ID']['input']>;
  publicToken?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<FileSortInput>;
};


export type QueryGetFolderDetailsArgs = {
  folderId?: InputMaybe<Scalars['ID']['input']>;
  publicToken?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetFolderSharesArgs = {
  folderId: Scalars['ID']['input'];
};


export type QueryGetFoldersInFolderArgs = {
  filter?: InputMaybe<FolderFilterInput>;
  folderId?: InputMaybe<Scalars['ID']['input']>;
  publicToken?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<FolderSortInput>;
};


export type QueryGetUsageStatsByUserArgs = {
  userID: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
  userID: Scalars['ID']['input'];
};


export type QueryGetUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  pageNo?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySearchFilesArgs = {
  query: Scalars['String']['input'];
  search: Scalars['String']['input'];
};

export type RegisterUser = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum Role {
  Admin = 'admin',
  User = 'user'
}

export type Share = {
  __typename?: 'Share';
  createdAt: Scalars['String']['output'];
  downloadCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  owner: User;
  publicToken?: Maybe<Scalars['String']['output']>;
  shareType: Scalars['String']['output'];
  sharedWith?: Maybe<User>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type UsageStat = {
  __typename?: 'UsageStat';
  actualStorageUsed: Scalars['Int']['output'];
  totalStorageUsed: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Time']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', name: string } } };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;