import { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Download,
    Search,
    FileText,
    Image,
    FileVideo,
    FileArchive,
    ChevronLeft,
    ChevronRight,
    Loader2,
    RefreshCw,
    AlertCircle
} from 'lucide-react';
import Layout from '@/components/layout';
import { GET_FILES_QUERY, DOWNLOAD_FILE_QUERY } from '@/hooks/api/files';

// Types for GraphQL responses
interface GetFilesResponse {
    getFiles: {
        files: {
            id: string;
            ownerID: string;
            filename: string;
            mimeType: string;
            size: number;
            uploadDate: string;
            downloadCount: number;
        }[];
        pagination: {
            count: number;
            totalCount: number;
            pageNo: number;
            totalPages: number;
            limit: number;
        };
    };
}

interface GetFilesVariables {
    limit?: number;
    pageNo?: number;
}

interface DownloadFileResponse {
    downloadFile: {
        url: string;
        filename: string;
    };
}

interface FileItem {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    downloadUrl?: string;
    mimeType: string;
    downloadCount: number;
    ownerID: string;
}

const Files = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(16);

    // GraphQL query for files
    const {
        data,
        loading,
        error,
        refetch
    } = useQuery<GetFilesResponse, GetFilesVariables>(GET_FILES_QUERY, {
        variables: {
            limit: pageSize,
            pageNo: currentPage
        },
        fetchPolicy: 'cache-and-network',
    });

    // Lazy query for file download
    const [downloadFile, { loading: downloadLoading }] = useLazyQuery<DownloadFileResponse>(
        DOWNLOAD_FILE_QUERY
    );

    // Transform GraphQL data to match FileItem interface
    const transformFiles = (graphqlFiles: GetFilesResponse['getFiles']['files']): FileItem[] => {
        return graphqlFiles.map(file => ({
            id: file.id,
            name: file.filename,
            type: getFileTypeFromMimeType(file.mimeType),
            size: formatFileSize(file.size),
            uploadDate: file.uploadDate,
            mimeType: file.mimeType,
            downloadCount: file.downloadCount,
            ownerID: file.ownerID
        }));
    };

    // Helper function to determine file type from MIME type
    const getFileTypeFromMimeType = (mimeType: string): string => {
        if (mimeType.startsWith('image/')) return 'image';
        if (mimeType.startsWith('video/')) return 'video';
        if (mimeType.includes('pdf')) return 'pdf';
        if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('tar')) return 'archive';
        if (mimeType.includes('word') || mimeType.includes('document')) return 'document';
        if (mimeType.includes('sheet') || mimeType.includes('excel')) return 'spreadsheet';
        if (mimeType.startsWith('text/')) return 'text';
        return 'document';
    };

    // Helper function to format file size
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    // Get transformed files
    const files = data ? transformFiles(data.getFiles.files) : [];
    const pagination = data?.getFiles.pagination;

    // Filter files based on search term
    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'image':
                return <Image className="w-8 h-8 text-blue-500" />;
            case 'video':
                return <FileVideo className="w-8 h-8 text-purple-500" />;
            case 'archive':
                return <FileArchive className="w-8 h-8 text-orange-500" />;
            default:
                return <FileText className="w-8 h-8 text-gray-500" />;
        }
    };

    const getFileTypeColor = (type: string) => {
        const colors = {
            pdf: 'destructive',
            image: 'default',
            video: 'secondary',
            archive: 'outline',
            document: 'default',
            text: 'secondary',
            spreadsheet: 'outline'
        } as const;

        return colors[type as keyof typeof colors] || 'default';
    };

    const handleDownload = async (file: FileItem) => {
        try {
            const { data } = await downloadFile({
                variables: { fileID: file.id }
            });

            if (data?.downloadFile.url) {
                // Create a temporary link to download the file
                const link = document.createElement('a');
                link.href = data.downloadFile.url;
                link.download = data.downloadFile.filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Download error:', error);

        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRefresh = () => {
        refetch();
    };

    // Loading state
    if (loading && !data) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                        <p className="text-muted-foreground">Loading files...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    // Error state
    if (error && !data) {
        return (
            <Layout>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                        <p className="text-red-600 mb-4">Error loading files</p>
                        <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
                        <Button onClick={handleRefresh} variant="outline">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Try Again
                        </Button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Files</h1>
                        <p className="text-muted-foreground mt-2">
                            Browse and download files
                            {pagination && (
                                <span className="ml-2">
                                    ({pagination.totalCount} total files)
                                </span>
                            )}
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative max-w-sm">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search files..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button onClick={handleRefresh} variant="outline" disabled={loading}>
                            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* Files Grid */}
                {filteredFiles.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium">No files found</h3>
                        <p className="text-muted-foreground">
                            {searchTerm ? 'Try adjusting your search terms' : 'No files available'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredFiles.map((file) => (
                            <Card key={file.id} className="group hover:shadow-lg transition-all duration-200">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center space-x-3">
                                        {getFileIcon(file.type)}
                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="text-sm truncate" title={file.name}>
                                                {file.name}
                                            </CardTitle>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <Badge variant={getFileTypeColor(file.type)} className="text-xs">
                                                    {file.type.toUpperCase()}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">{file.size}</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs text-muted-foreground">
                                            <div>
                                                {new Date(file.uploadDate).toLocaleDateString()}
                                            </div>
                                            <div className="mt-1">
                                                {file.downloadCount} downloads
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleDownload(file)}
                                            disabled={downloadLoading}
                                            className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-blue-50"
                                        >
                                            {downloadLoading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Download className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && !searchTerm && (
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <p className="text-sm text-muted-foreground">
                                        Showing {(pagination.pageNo - 1) * pagination.limit + 1} to{' '}
                                        {Math.min(pagination.pageNo * pagination.limit, pagination.totalCount)} of{' '}
                                        {pagination.totalCount} results
                                    </p>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(pagination.pageNo - 1)}
                                        disabled={pagination.pageNo <= 1 || loading}
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Previous
                                    </Button>

                                    <div className="flex items-center space-x-1">
                                        {[...Array(Math.min(5, pagination.totalPages))].map((_, index) => {
                                            const pageNum = pagination.pageNo - 2 + index;
                                            if (pageNum < 1 || pageNum > pagination.totalPages) return null;

                                            return (
                                                <Button
                                                    key={pageNum}
                                                    variant={pageNum === pagination.pageNo ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => handlePageChange(pageNum)}
                                                    disabled={loading}
                                                    className="w-8 h-8 p-0"
                                                >
                                                    {pageNum}
                                                </Button>
                                            );
                                        })}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handlePageChange(pagination.pageNo + 1)}
                                        disabled={pagination.pageNo >= pagination.totalPages || loading}
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Layout>
    );
};

export default Files;