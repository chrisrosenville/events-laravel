import { MainLayout } from '@/layouts/MainLayout';
import { formatDate } from '@/lib/utils';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function EventsIndex({ auth, events = [] }: PageProps) {
    return (
        <MainLayout>
            <Head title="Events" />

            <main className="max-w-page mx-auto min-h-svh p-4 sm:p-8">
                <div className="mx-auto mb-8 max-w-7xl">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">All Events</h1>
                        {auth.user && (
                            <Link
                                href={route('events.create')}
                                className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase ring-blue-300 transition duration-150 ease-in-out hover:bg-blue-500 focus:border-blue-700 focus:ring focus:outline-none active:bg-blue-700 disabled:opacity-25"
                            >
                                Create Event
                            </Link>
                        )}
                    </div>

                    {events && events.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {events.map((event) => (
                                <div key={event.id} className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={event.image_url || 'https://placehold.co/600x400'}
                                            alt={event.name}
                                            className="h-48 w-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h2 className="mb-2 text-xl font-bold">
                                            <Link href={route('events.show', { event: event.id })} className="hover:underline">
                                                {event.name}
                                            </Link>
                                        </h2>
                                        <div className="mb-4 text-sm text-gray-500">
                                            <p>{formatDate(event.start_date)}</p>
                                            {event.location && <p>{event.location}</p>}
                                        </div>
                                        <p className="mb-4 line-clamp-3 text-gray-700">{event.description || 'No description available.'}</p>
                                        <div className="flex items-center justify-between text-sm">
                                            <div>
                                                <span className="text-gray-500">{event.attending_count} attending</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">by {event.user?.name || 'Unknown'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-12 text-center">
                                <p className="text-gray-500">No events found.</p>
                                {auth.user && (
                                    <p className="mt-4">
                                        <Link href={route('events.create')} className="text-blue-600 hover:text-blue-800">
                                            Create the first event!
                                        </Link>
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </MainLayout>
    );
}
