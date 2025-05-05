import { formatDate } from '@/lib/utils';
import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

export default function EventShow({ auth, event, isAttending, attendeeCount, flash }: PageProps) {
    // Form for handling the attend/unattend actions
    const { post, delete: destroy, processing } = useForm({});

    // Handle attend event action
    const handleAttend = () => {
        post(route('events.attend', { event: event?.id }));
    };

    // Handle unattend event action
    const handleUnattend = () => {
        destroy(route('events.unattend', { event: event?.id }));
    };

    if (!event) return null;

    return (
        <>
            <Head title={event.name} />

            {/* Success Message */}
            {flash?.success && (
                <div className="mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
                    <div className="border-l-4 border-green-400 bg-green-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-800">{flash.success}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Event Header */}
                    <div className="mb-8 overflow-hidden bg-white shadow sm:rounded-lg">
                        <div className="relative">
                            <img
                                src={`https://source.unsplash.com/random/1200x400/?event&sig=${event.id}`}
                                alt={event.name}
                                className="h-64 w-full object-cover"
                            />
                            <div className="bg-opacity-40 absolute inset-0 flex items-end bg-black">
                                <div className="p-6 text-white">
                                    <h1 className="text-3xl font-bold">{event.name}</h1>
                                    <p className="mt-2">
                                        {formatDate(event.start_date)}
                                        {event.end_date && ` - ${formatDate(event.end_date)}`}
                                    </p>
                                    {event.location && <p className="mt-1">{event.location}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center">
                                    <svg className="mr-1 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    <span>{attendeeCount} attending</span>
                                </div>
                                <div>
                                    {event.user && (
                                        <div className="text-sm text-gray-700">
                                            <span>Created by: {event.user.name}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 flex items-center space-x-4 sm:mt-0">
                                {/* Only show edit/delete if current user is the creator */}
                                {auth.user && event.user_id === auth.user.id && (
                                    <>
                                        <Link
                                            href={route('events.edit', { event: event.id })}
                                            className="inline-flex items-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-xs font-semibold tracking-widest text-gray-800 uppercase transition hover:bg-gray-300 focus:outline-none active:bg-gray-400"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={route('events.destroy', { event: event.id })}
                                            method="delete"
                                            as="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition hover:bg-red-500 focus:border-red-700 focus:outline-none active:bg-red-700"
                                        >
                                            Delete
                                        </Link>
                                    </>
                                )}

                                {/* Attend/Unattend button for authenticated users who are not the creator */}
                                {auth.user && event.user_id !== auth.user.id && (
                                    <>
                                        {isAttending ? (
                                            <button
                                                onClick={handleUnattend}
                                                disabled={processing}
                                                className="inline-flex items-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-xs font-semibold tracking-widest text-gray-800 uppercase transition hover:bg-gray-300 focus:outline-none active:bg-gray-400"
                                            >
                                                {processing ? 'Processing...' : 'Cancel Attendance'}
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleAttend}
                                                disabled={processing}
                                                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition hover:bg-blue-500 focus:border-blue-700 focus:outline-none active:bg-blue-700"
                                            >
                                                {processing ? 'Processing...' : 'Attend This Event'}
                                            </button>
                                        )}
                                    </>
                                )}

                                {/* Prompt to login if not authenticated */}
                                {!auth.user && (
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition hover:bg-blue-500 focus:outline-none active:bg-blue-700"
                                    >
                                        Login to Attend
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Event details */}
                    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Event Details</h3>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                            <div className="prose max-w-none">
                                {event.description ? (
                                    <div dangerouslySetInnerHTML={{ __html: event.description }} />
                                ) : (
                                    <p className="text-gray-500 italic">No description provided.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-8 flex justify-between">
                        <Link href={route('events.index')} className="text-blue-600 hover:text-blue-800">
                            ← Back to Events
                        </Link>

                        {auth.user && (
                            <Link href={route('dashboard')} className="text-blue-600 hover:text-blue-800">
                                Go to Dashboard →
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
