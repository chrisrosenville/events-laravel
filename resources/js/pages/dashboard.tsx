import { MainLayout } from '@/layouts/MainLayout';
import { formatDate } from '@/lib/utils';
import { Event, PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ createdEvents = [], attendingEvents = [] }: PageProps) {
    return (
        <MainLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">Dashboard</h1>

                    {/* Events you created */}
                    <div className="mb-12">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-gray-800">My Events</h2>
                            <Link
                                href={route('events.create')}
                                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase ring-blue-300 transition duration-150 ease-in-out hover:bg-blue-500 focus:border-blue-700 focus:ring focus:outline-none active:bg-blue-700 disabled:opacity-25"
                            >
                                Create New Event
                            </Link>
                        </div>

                        {createdEvents && createdEvents.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {createdEvents.map((event: Event) => (
                                    <div key={event.id} className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                                            <img
                                                src={`https://source.unsplash.com/random/800x450/?event&sig=${event.id}`}
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
                                    <Link href={route('events.create')} className="mt-4 inline-block text-blue-600 hover:text-blue-800">
                                        Create your first event!
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Events you're attending */}
                    <div>
                        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Events I'm Attending</h2>

                        {attendingEvents && attendingEvents.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {attendingEvents.map((event: Event) => (
                                    <div key={event.id} className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                                            <img
                                                src={`https://source.unsplash.com/random/800x450/?event&sig=${event.id}`}
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
                </div>
            </div>
        </MainLayout>
    );
}
