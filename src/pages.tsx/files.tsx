import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, Search, FileText, Image, FileVideo, FileArchive } from 'lucide-react';
import Layout from '@/components/layout';
import { FileItem } from '@/types/user';

// Mock data
const mockFiles: FileItem[] = [
    {
        id: '1',
        name: 'Project_Proposal.pdf',
        type: 'pdf',
        size: '2.4 MB',
        uploadDate: '2024-03-15',
        downloadUrl: '#'
    },
    {
        id: '2',
        name: 'Design_Assets.zip',
        type: 'archive',
        size: '15.7 MB',
        uploadDate: '2024-03-14',
        downloadUrl: '#'
    },
    {
        id: '3',
        name: 'Team_Meeting.mp4',
        type: 'video',
        size: '124.3 MB',
        uploadDate: '2024-03-13',
        downloadUrl: '#'
    },
    {
        id: '4',
        name: 'Logo_Final.png',
        type: 'image',
        size: '856 KB',
        uploadDate: '2024-03-12',
        downloadUrl: '#'
    },
    {
        id: '5',
        name: 'Requirements_Doc.docx',
        type: 'document',
        size: '1.2 MB',
        uploadDate: '2024-03-11',
        downloadUrl: '#'
    },
    {
        id: '6',
        name: 'Database_Schema.sql',
        type: 'text',
        size: '45 KB',
        uploadDate: '2024-03-10',
        downloadUrl: '#'
    },
    {
        id: '7',
        name: 'User_Research.xlsx',
        type: 'spreadsheet',
        size: '3.1 MB',
        uploadDate: '2024-03-09',
        downloadUrl: '#'
    },
    {
        id: '8',
        name: 'Brand_Guidelines.pdf',
        type: 'pdf',
        size: '5.8 MB',
        uploadDate: '2024-03-08',
        downloadUrl: '#'
    }
];

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
        archive: 'warning',
        document: 'default',
        text: 'secondary',
        spreadsheet: 'success'
    } as any;

    return colors[type] || 'default';
};

const Files = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFiles = mockFiles.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDownload = (file: FileItem) => {
        // Handle file download
        console.log('Downloading:', file.name);
    };

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Files</h1>
                        <p className="text-muted-foreground mt-2">Browse and download files</p>
                    </div>
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search files..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredFiles.map((file) => (
                        <Card key={file.id} className="group hover:shadow-hover transition-smooth">
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
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(file.uploadDate).toLocaleDateString()}
                                    </span>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDownload(file)}
                                        className="opacity-0 group-hover:opacity-100 transition-smooth"
                                    >
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredFiles.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium">No files found</h3>
                        <p className="text-muted-foreground">
                            {searchTerm ? 'Try adjusting your search terms' : 'No files available'}
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Files;