import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Eye,
    Mail,
    MapPin,
    ChevronLeft,
    ChevronRight,
    Users as UsersIcon,
    Loader2,
    RefreshCw,
    AlertCircle
} from 'lucide-react';
import Layout from '@/components/layout';
import UserModal from '@/components/UserModal';
import { User } from '@/types/user';
import { GET_USERS_QUERY } from '@/hooks/api/users';

// Types for GraphQL responses
interface GetUsersResponse {
    getUsers: {
        users: {
            id: string;
            name: string;
            email: string;
            role: string;
            createdAt: string;
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

interface GetUsersVariables {
    limit?: number;
    pageNo?: number;
}

// Extended User type to match your existing User interface
interface ExtendedUser extends User {
    createdAt?: string;
}

const Users = () => {
    const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(12);

    // GraphQL query for users
    const {
        data,
        loading,
        error,
        refetch
    } = useQuery<GetUsersResponse, GetUsersVariables>(GET_USERS_QUERY, {
        variables: {
            limit: pageSize,
            pageNo: currentPage
        },
        fetchPolicy: 'cache-and-network',
    });

    // Transform GraphQL data to match existing User interface
    const transformUsers = (graphqlUsers: GetUsersResponse['getUsers']['users']): ExtendedUser[] => {
        return graphqlUsers.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            // Mock data for fields not in GraphQL response
            phone: '+1 (555) 000-0000',
            location: 'Remote',
            status: Math.random() > 0.2 ? 'active' : 'inactive',
            joinDate: new Date(user.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
            }),
            bio: `${user.role} with extensive experience in the field.`
        }));
    };

    // Get transformed users
    const users = data ? transformUsers(data.getUsers.users) : [];
    const pagination = data?.getUsers.pagination;

    const handleViewUser = (user: ExtendedUser) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
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
                        <p className="text-muted-foreground">Loading users...</p>
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
                        <p className="text-red-600 mb-4">Error loading users</p>
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
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Users</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage and view all system users
                            {pagination && (
                                <span className="ml-2">
                                    ({pagination.totalCount} total users)
                                </span>
                            )}
                        </p>
                    </div>
                    <Button onClick={handleRefresh} variant="outline" disabled={loading}>
                        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>

                {/* Users Grid */}
                {users.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center">
                            <UsersIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">No users found</h3>
                            <p className="text-muted-foreground">
                                No users available at the moment
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {users.map((user) => (
                            <Card key={user.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-200">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <CardTitle className="text-lg truncate">{user.name}</CardTitle>
                                                <p className="text-sm text-muted-foreground truncate">{user.role}</p>
                                            </div>
                                        </div>
                                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                                            {user.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <Mail className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{user.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{user.location}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-xs text-muted-foreground">
                                            Joined {user.joinDate}
                                        </span>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleViewUser(user)}
                                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-50"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
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

            {/* User Modal */}
            <UserModal
                user={selectedUser}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </Layout>
    );
};

export default Users;