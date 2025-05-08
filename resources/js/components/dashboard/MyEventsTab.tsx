import { Button } from '@/components/buttons/Button';
import { formatDate } from '@/lib/utils';
import { Event } from '@/types';
import { Link } from '@inertiajs/react';

interface MyEventsTabProps {
    events: Event[];
    onCreateClick: () => void;
}

export const MyEventsTab = ({ events, onCreateClick }: MyEventsTabProps) => {
    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">My Events</h2>
                <Button onClick={onCreateClick} className="bg-blue-600 text-white hover:bg-blue-500">
                    Create New Event
                </Button>
            </div>

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
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xs text-gray-500">{event.attending_count} attending</span>
                                    <div className="flex space-x-2">
                                        <Link href={route('events.edit', { event: event.id })} className="text-xs text-blue-600 hover:text-blue-800">
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
                        <button onClick={onCreateClick} className="mt-4 inline-block text-blue-600 hover:text-blue-800">
                            Create your first event!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
