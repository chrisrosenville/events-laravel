import { MainLayout } from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export const SettingsLayout = ({ children }: PropsWithChildren<SettingsLayoutProps>) => {
    return (
        <MainLayout>
            <div className="max-w-page mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <div className="space-y-6">
                    {/* Horizontal Tabs */}
                    <div className="border-b border-gray-200">
                        <div className="flex space-x-8">
                            <Link
                                href={route('profile.edit')}
                                className={`inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium ${
                                    route().current('profile.edit')
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Profile
                            </Link>
                            <Link
                                href={route('password.edit')}
                                className={`inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium ${
                                    route().current('password.edit')
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Password
                            </Link>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="rounded-lg border bg-white p-6 shadow-sm">{children}</div>
                </div>
            </div>
        </MainLayout>
    );
};
