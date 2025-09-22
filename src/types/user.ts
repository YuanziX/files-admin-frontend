export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    location: string;
    status: 'active' | 'inactive';
    joinDate: string;
    bio?: string;
    avatar?: string;
}

export interface FileItem {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    downloadUrl: string;
    thumbnail?: string;
}