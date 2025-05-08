import { AttendingEventsTab } from '@/components/dashboard/AttendingEventsTab';
import { CreateEventTab } from '@/components/dashboard/CreateEventTab';
import { MyEventsTab } from '@/components/dashboard/MyEventsTab';
import { PasswordTab } from '@/components/dashboard/PasswordTab';
import { ProfileTab } from '@/components/dashboard/ProfileTab';
import { MainLayout } from '@/layouts/MainLayout';
import { Event, PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface DashboardProps extends PageProps {
    user: {
        id: number;
        name: string;
        email: string;
    };
    createdEvents: Event[];
    attendingEvents: Event[];
}

export default function Dashboard({ user, createdEvents = [], attendingEvents = [] }: DashboardProps) {
    // State for active tab
    const [activeTab, setActiveTab] = useState('my-events');

    // Profile update form
    const {
        data: profileData,
        setData: setProfileData,
        patch: updateProfile,
        errors: profileErrors,
        processing: profileProcessing,
        recentlySuccessful: profileSuccess,
    } = useForm({
        name: user.name,
        email: user.email,
    });

    const submitProfile: FormEventHandler = (e) => {
        e.preventDefault();
        updateProfile(route('profile.update'));
    };

    // Password update form
    const {
        data: passwordData,
        setData: setPasswordData,
        put: updatePassword,
        errors: passwordErrors,
        reset: resetPassword,
        processing: passwordProcessing,
        recentlySuccessful: passwordSuccess,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitPassword: FormEventHandler = (e) => {
        e.preventDefault();
        updatePassword(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => resetPassword(),
        });
    };

    // Account deletion form
    const {
        data: deleteData,
        setData: setDeleteData,
        delete: destroy,
        errors: deleteErrors,
        processing: deleteProcessing,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion: FormEventHandler = (e) => {
        e.preventDefault();

        const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

        if (confirmed) {
            destroy(route('profile.destroy'));
        }
    };

    const handleCreateClick = () => setActiveTab('create');

    return (
        <MainLayout>
            <Head title="Dashboard" />

            <main className="max-w-page relative mx-auto min-h-svh">
                <div className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">Dashboard</h1>

                    {/* Horizontal Navigation Tabs */}
                    <div className="mb-8 border-b border-gray-200">
                        <div className="flex space-x-8">
                            <button
                                onClick={() => setActiveTab('my-events')}
                                className={`inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium ${
                                    activeTab === 'my-events'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                My Events
                            </button>
                            <button
                                onClick={() => setActiveTab('attending')}
                                className={`inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium ${
                                    activeTab === 'attending'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Events I'm Attending
                            </button>
                            <button
                                onClick={() => setActiveTab('create')}
                                className={`inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium ${
                                    activeTab === 'create'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Create Event
                            </button>
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium ${
                                    activeTab === 'profile'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('password')}
                                className={`inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium ${
                                    activeTab === 'password'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Password
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'my-events' && <MyEventsTab events={createdEvents} onCreateClick={handleCreateClick} />}

                    {activeTab === 'attending' && <AttendingEventsTab events={attendingEvents} />}

                    {activeTab === 'create' && <CreateEventTab />}

                    {activeTab === 'profile' && (
                        <ProfileTab
                            userData={user}
                            profileData={profileData}
                            deleteData={deleteData}
                            profileErrors={profileErrors}
                            deleteErrors={deleteErrors}
                            profileProcessing={profileProcessing}
                            deleteProcessing={deleteProcessing}
                            profileSuccess={profileSuccess}
                            setProfileData={(key, value) => setProfileData(key, value)}
                            setDeleteData={(key, value) => setDeleteData(key, value)}
                            submitProfile={submitProfile}
                            confirmUserDeletion={confirmUserDeletion}
                        />
                    )}

                    {activeTab === 'password' && (
                        <PasswordTab
                            passwordData={passwordData}
                            errors={passwordErrors}
                            processing={passwordProcessing}
                            success={passwordSuccess}
                            setPasswordData={(key, value) => setPasswordData(key, value)}
                            submitPassword={submitPassword}
                        />
                    )}
                </div>
            </main>
        </MainLayout>
    );
}
