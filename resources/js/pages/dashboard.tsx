import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';
import { InputError } from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { MainLayout } from '@/layouts/MainLayout';
import { formatDate } from '@/lib/utils';
import { Event, PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
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

                    {/* My Events Tab */}
                    {activeTab === 'my-events' && (
                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold text-gray-800">My Events</h2>
                                <Button onClick={() => setActiveTab('create')} className="bg-blue-600 text-white hover:bg-blue-500">
                                    Create New Event
                                </Button>
                            </div>

                            {createdEvents && createdEvents.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {createdEvents.map((event: Event) => (
                                        <div key={event.id} className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                                                <img
                                                    src={event.image_url || 'https://placehold.co/600x400'}
                                                    alt={event.name}
                                                    className="h-32 w-full object-cover"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="mb-2 text-lg font-semibold">
                                                    <Link href={route('events.show', { event: event.id })} className="hover:text-blue-600">
                                                        {event.name}
                                                    </Link>
                                                </h3>
                                                <p className="mb-2 text-sm text-gray-500">{formatDate(event.start_date)}</p>
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="text-xs text-gray-500">{event.attending_count} attending</span>
                                                    <div className="flex space-x-2">
                                                        <Link
                                                            href={route('events.edit', { event: event.id })}
                                                            className="text-xs text-blue-600 hover:text-blue-800"
                                                        >
                                                            Edit
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <div className="p-6 text-center">
                                        <p className="text-gray-500">You haven't created any events yet.</p>
                                        <button
                                            onClick={() => setActiveTab('create')}
                                            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                                        >
                                            Create your first event!
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Attending Events Tab */}
                    {activeTab === 'attending' && (
                        <div>
                            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Events I'm Attending</h2>

                            {attendingEvents && attendingEvents.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {attendingEvents.map((event: Event) => (
                                        <div key={event.id} className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                                                <img
                                                    src={event.image_url || 'https://placehold.co/600x400'}
                                                    alt={event.name}
                                                    className="h-32 w-full object-cover"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="mb-2 text-lg font-semibold">
                                                    <Link href={route('events.show', { event: event.id })} className="hover:text-blue-600">
                                                        {event.name}
                                                    </Link>
                                                </h3>
                                                <p className="mb-2 text-sm text-gray-500">{formatDate(event.start_date)}</p>
                                                {event.user && <p className="text-xs text-gray-500">Created by: {event.user.name}</p>}
                                                <div className="mt-4">
                                                    <Link
                                                        href={route('events.show', { event: event.id })}
                                                        className="text-xs text-blue-600 hover:text-blue-800"
                                                    >
                                                        View Details
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <div className="p-6 text-center">
                                        <p className="text-gray-500">You're not attending any events yet.</p>
                                        <Link href={route('events.index')} className="mt-4 inline-block text-blue-600 hover:text-blue-800">
                                            Browse events!
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Create Event Tab */}
                    {activeTab === 'create' && (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h2 className="mb-4 text-2xl font-semibold text-gray-800">Create New Event</h2>
                                <p className="mb-4 text-gray-500">To create a new event, click the button below:</p>
                                <Link
                                    href={route('events.create')}
                                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none"
                                >
                                    Create Event
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Profile Settings Tab */}
                    {activeTab === 'profile' && (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                                        <p className="mt-1 text-sm text-gray-600">Update your account's profile information and email address.</p>
                                    </div>

                                    <form onSubmit={submitProfile} className="space-y-4">
                                        <div>
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData('name', e.target.value)}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError message={profileErrors.name} className="mt-2" />
                                        </div>

                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData('email', e.target.value)}
                                                className="mt-1 block w-full"
                                                required
                                            />
                                            <InputError message={profileErrors.email} className="mt-2" />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <Button disabled={profileProcessing}>Save</Button>

                                            {profileSuccess && <p className="text-sm text-green-600">Saved.</p>}
                                        </div>
                                    </form>

                                    <div className="border-t border-gray-200 pt-6">
                                        <h2 className="text-lg font-medium text-gray-900">Delete Account</h2>
                                        <p className="mt-1 text-sm text-gray-600">
                                            Once your account is deleted, all of its resources and data will be permanently deleted.
                                        </p>

                                        <form onSubmit={confirmUserDeletion} className="mt-4">
                                            <div className="mt-4">
                                                <Label htmlFor="password">Password</Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    value={deleteData.password}
                                                    onChange={(e) => setDeleteData('password', e.target.value)}
                                                    className="mt-1 block w-full"
                                                    placeholder="Enter your password to confirm"
                                                    required
                                                />
                                                <InputError message={deleteErrors.password} className="mt-2" />
                                            </div>

                                            <div className="mt-4">
                                                <Button disabled={deleteProcessing} className="bg-red-600 text-white hover:bg-red-700">
                                                    Delete Account
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Password Settings Tab */}
                    {activeTab === 'password' && (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <div>
                                    <h2 className="text-lg font-medium text-gray-900">Update Password</h2>
                                    <p className="mt-1 text-sm text-gray-600">Ensure your account is using a long, random password to stay secure.</p>

                                    <form onSubmit={submitPassword} className="mt-6 space-y-6">
                                        <div>
                                            <Label htmlFor="current_password">Current Password</Label>
                                            <Input
                                                id="current_password"
                                                type="password"
                                                name="current_password"
                                                value={passwordData.current_password}
                                                onChange={(e) => setPasswordData('current_password', e.target.value)}
                                                className="mt-1 block w-full"
                                                autoComplete="current-password"
                                            />
                                            <InputError message={passwordErrors.current_password} className="mt-2" />
                                        </div>

                                        <div>
                                            <Label htmlFor="password">New Password</Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={passwordData.password}
                                                onChange={(e) => setPasswordData('password', e.target.value)}
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                            />
                                            <InputError message={passwordErrors.password} className="mt-2" />
                                        </div>

                                        <div>
                                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={passwordData.password_confirmation}
                                                onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                                className="mt-1 block w-full"
                                                autoComplete="new-password"
                                            />
                                            <InputError message={passwordErrors.password_confirmation} className="mt-2" />
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <Button disabled={passwordProcessing}>Save</Button>

                                            {passwordSuccess && <p className="text-sm text-green-600">Saved.</p>}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </MainLayout>
    );
}
