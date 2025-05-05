import { Link } from '@inertiajs/react';

export const Footer = () => {
    return (
        <footer className="bg-neutral-100 py-4 text-black dark:bg-neutral-900 dark:text-white">
            <div className="container mx-auto text-center">
                <Link href="/" className="text-xl font-bold text-blue-600">
                    {import.meta.env.VITE_APP_NAME || 'Evinent'}
                </Link>
                <div className="mt-2">
                    <a href="/privacy" className="text-sm hover:underline">
                        Privacy Policy
                    </a>
                    {' | '}
                    <a href="/terms" className="text-sm hover:underline">
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
};
