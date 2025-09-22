import { Button } from '@/components/ui/button';
import Layout from '@/components/layout';

export default function Index() {
    return (
        <Layout>
            <div className="text-center py-12">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                        Welcome to AdminHub
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Your centralized platform for user management and file organization
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                            Get Started
                        </Button>
                        <Button size="lg" variant="outline">
                            Learn More
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

