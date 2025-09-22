import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { User } from '@/types/user';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, Calendar, Phone, Globe, HardDrive, Loader2 } from 'lucide-react';
import { GET_USER_BY_ID_QUERY, GET_USER_USAGE_STATS_QUERY } from '@/hooks/api/users';

interface UserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

interface UserDetails {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

interface UserUsageStats {
    totalStorageUsed: number;
    actualStorageUsed: number;
}

const UserModal = ({ user, isOpen, onClose }: UserModalProps) => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [usageStats, setUsageStats] = useState<UserUsageStats | null>(null);

    // Fetch user details
    const {
        data: userDetailsData,
        loading: userDetailsLoading,
        error: userDetailsError
    } = useQuery(GET_USER_BY_ID_QUERY, {
        variables: { userID: user?.id || '' },
        skip: !user?.id || !isOpen,
    });

    // Fetch user usage stats
    const {
        data: usageStatsData,
        loading: usageStatsLoading,
        error: usageStatsError
    } = useQuery(GET_USER_USAGE_STATS_QUERY, {
        variables: { userID: user?.id || '' },
        skip: !user?.id || !isOpen,

    });

    useEffect(() => {
        if (!isOpen || !user) {
            setUserDetails(null);
            setUsageStats(null);
        }
    }, [isOpen, user]);

    const formatStorageSize = (bytes: number): string => {
        const units = ['B', 'KB', 'MB', 'GB', 'TB'];
        let size = bytes;
        let unitIndex = 0;

        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }

        return `${size.toFixed(2)} ${units[unitIndex]}`;
    };

    // Helper function to format date
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!user) return null;

    const isLoading = userDetailsLoading || usageStatsLoading;
    const hasError = userDetailsError || usageStatsError;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span className="ml-2">Loading user details...</span>
                    </div>
                ) : hasError ? (
                    <div className="text-center py-8">
                        <p className="text-red-500 text-sm">
                            Error loading user details. Please try again.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* User Header */}
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                                {(userDetails?.name || user.name).split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {userDetails?.name || user.name}
                                </h3>
                                <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                                    {user.status}
                                </Badge>
                            </div>
                        </div>

                        {/* User Information */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">
                                    {userDetails?.email || user.email}
                                </span>
                            </div>

                            {user.phone && (
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">{user.phone}</span>
                                </div>
                            )}

                            <div className="flex items-center space-x-3">
                                <Globe className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">
                                    {userDetails?.role || user.role}
                                </span>
                            </div>

                            {user.location && (
                                <div className="flex items-center space-x-3">
                                    <MapPin className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm">{user.location}</span>
                                </div>
                            )}

                            <div className="flex items-center space-x-3">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm">
                                    Joined {userDetails?.createdAt
                                        ? formatDate(userDetails.createdAt)
                                        : user.joinDate
                                    }
                                </span>
                            </div>
                        </div>

                        {/* Storage Usage */}
                        {usageStats && (
                            <div className="border-t pt-4">
                                <h4 className="font-medium mb-3 flex items-center">
                                    <HardDrive className="w-4 h-4 mr-2" />
                                    Storage Usage
                                </h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">
                                            Total Storage Used:
                                        </span>
                                        <span className="text-sm font-medium">
                                            {formatStorageSize(usageStats.totalStorageUsed)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">
                                            Actual Storage Used:
                                        </span>
                                        <span className="text-sm font-medium">
                                            {formatStorageSize(usageStats.actualStorageUsed)}
                                        </span>
                                    </div>

                                    {/* Storage Usage Bar */}
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{
                                                width: `${Math.min(
                                                    (usageStats.actualStorageUsed / usageStats.totalStorageUsed) * 100,
                                                    100
                                                )}%`
                                            }}
                                        />
                                    </div>
                                    <div className="text-xs text-muted-foreground text-center">
                                        {((usageStats.actualStorageUsed / usageStats.totalStorageUsed) * 100).toFixed(1)}% used
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Bio */}
                        {user.bio && (
                            <div className="border-t pt-4">
                                <h4 className="font-medium mb-2">Bio</h4>
                                <p className="text-sm text-muted-foreground">{user.bio}</p>
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default UserModal;