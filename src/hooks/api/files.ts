import { graphql } from "@/__generated__";

export const GET_FILES_QUERY = graphql(`
  query GetFiles(limit: Int, pageNo: Int) {
    getFiles(limit: $limit, pageNo: $pageNo) {
      files {
        id
        ownerID
        fileName
        mimeType
        size
        uploadDate
        downloadCount
      }
      pagination {
        count: Int!
        totalCount: Int!
        pageNo: Int!
        totalPages: Int!
        limit: Int!
      }
    }
  }`);

export const DOWNLOAD_FILE_QUERY = graphql(`
  query DownloadFile($fileID: ID!) {
    downloadFile(fileID: $fileID) {
      url
      filename
    }
  }
`);
