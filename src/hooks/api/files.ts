import { graphql } from "@/__generated__";

export const GET_FILES_QUERY = graphql(`
  query GetFiles($limit: Int, $pageNo: Int) {
    getFiles(limit: $limit, pageNo: $pageNo) {
      files {
        id
        ownerID
        filename
        mimeType
        size
        uploadDate
        downloadCount
      }
      pagination {
        count
        totalCount
        pageNo
        totalPages
        limit
      }
    }
  }
`);

export const DOWNLOAD_FILE_QUERY = graphql(`
  query DownloadFile($fileID: ID!) {
    downloadFile(fileID: $fileID) {
      url
      filename
    }
  }
`);
