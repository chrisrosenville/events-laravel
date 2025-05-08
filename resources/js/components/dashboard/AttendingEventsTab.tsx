import { formatDate } from '@/lib/utils';
import { Event } from '@/types';
import { Link } from '@inertiajs/react';

interface AttendingEventsTabProps {
    events: Event[];
}

export const AttendingEventsTab = ({ events }: AttendingEventsTabProps) => {
    return (
        <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">Events I'm Attending</h2>

            {events && events.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event: Event) => (
                        <div key={event.id} className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                                <img src={event.image_url || 'https://placehold.co/600x400'} alt={event.name} className="h-32 w-full object-cover" />
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
                                    <Link href={route('events.show', { event: event.id })} className="text-xs text-blue-600 hover:text-blue-800">
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
    );
};
