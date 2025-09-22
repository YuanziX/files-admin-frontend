import { User } from '@/types/user';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Mail, MapPin, Calendar, Phone, Globe } from 'lucide-react';

interface UserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
}

const UserModal = ({ user, isOpen, onClose }: UserModalProps) => {
    if (!user) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{user.name}</h3>
                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                                {user.status}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{user.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Globe className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{user.role}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{user.location}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">Joined {user.joinDate}</span>
                        </div>
                    </div>

                    {user.bio && (
                        <div>
                            <h4 className="font-medium mb-2">Bio</h4>
                            <p className="text-sm text-muted-foreground">{user.bio}</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserModal;