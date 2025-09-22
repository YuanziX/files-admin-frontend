import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, FileText } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const location = useLocation();

    const navigation = [
        { name: 'Users', href: '/users', icon: Users },
        { name: 'Files', href: '/files', icon: FileText },
    ];
    const { triggerAuthRefresh } = useAuth()
    const naviagte = useNavigate()

    return (
        <div className="min-h-screen bg-background">
            <header className="bg-card border-b shadow-card">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-8">
                            <Link to="/" className="text-xl font-bold bg-gradient-primary bg-clip-text ">
                                AdminHub
                            </Link>
                            <nav className="flex space-x-4">
                                {navigation.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${isActive
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                            <button onClick={() => {
                                localStorage.removeItem("token")
                                triggerAuthRefresh()
                                naviagte("/")
                            }}>
                                logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;