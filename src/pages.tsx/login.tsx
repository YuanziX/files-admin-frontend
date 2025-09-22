import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Mail, Lock, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { LOGIN_MUTATION } from '@/hooks/api/auth';
import { useAuth } from '@/hooks/use-auth';

interface LoginResponse {
    login: {
        user: {
            name: string;
        };
        token: string;
    };
}

interface LoginVariables {
    email: string;
    password: string;
}

// Form validation types
interface FormErrors {
    email?: string;
    password?: string;
    general?: string;
}

const LoginPage = () => {
    const navigate = useNavigate();
    const { triggerAuthRefresh } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // GraphQL mutation
    const [loginMutation, { loading, error }] = useMutation<LoginResponse, LoginVariables>(
        LOGIN_MUTATION,
        {
            onCompleted: (data) => {
                if (data.login.token) {
                    // Store token and user data
                    localStorage.setItem('token', data.login.token);
                    triggerAuthRefresh()
                    localStorage.setItem('userData', JSON.stringify(data.login.user));

                    // Show success message briefly
                    setErrors({});

                    // Redirect to dashboard or home page
                    setTimeout(() => {
                        navigate('/', { replace: true });
                    }, 1000);
                }
            },
            onError: (error) => {
                console.error('Login error:', error);
                setErrors({
                    general: error.message || 'Login failed. Please try again.'
                });
                setIsSubmitting(false);
            }
        }
    );

    // Form validation
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 3) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            await loginMutation({
                variables: {
                    email: formData.email.trim(),
                    password: formData.password
                }
            });
        } catch (error) {
            // Error is handled in the onError callback
            setIsSubmitting(false);
        }
    };

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear field-specific errors when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const isLoading = loading || isSubmitting;
    const isSuccess = !error && !loading && isSubmitting;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your account to continue</p>
                </div>

                <Card className="shadow-xl border-0">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl font-semibold text-center">Login</CardTitle>
                        <CardDescription className="text-center">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* General Error Alert */}
                            {errors.general && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{errors.general}</AlertDescription>
                                </Alert>
                            )}

                            {/* Success Alert */}
                            {isSuccess && (
                                <Alert className="border-green-200 bg-green-50 text-green-800">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <AlertDescription>
                                        Login successful! Redirecting to dashboard...
                                    </AlertDescription>
                                </Alert>
                            )}

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className={`pl-10 ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                                        autoComplete="email"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        className={`pl-10 pr-10 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                                        autoComplete="current-password"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isLoading}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-400" />
                                        )}
                                    </Button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Forgot Password Link */}
                            <div className="flex justify-end">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {isSubmitting ? 'Signing in...' : 'Loading...'}
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>

                            {/* Sign Up Link */}
                            <div className="text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link
                                    to="/register"
                                    className="text-blue-600 hover:text-blue-500 hover:underline font-medium"
                                >
                                    Sign up here
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-gray-500">
                    <p>© 2024 Your Company. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

// Auth utility functions (you might want to put these in a separate file)
export const authUtils = {
    // Get stored token
    getToken: (): string | null => {
        return localStorage.getItem('authToken');
    },

    // Get stored user data
    getUser: (): { name: string } | null => {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        const token = localStorage.getItem('authToken');
        return !!token;
    },

    // Logout function
    logout: (): void => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.location.href = '/login';
    },

    // Set up axios interceptor for API calls (if using axios)
    setupAxiosInterceptor: () => {
        // This would go in your axios setup
        // axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;
    }
};
