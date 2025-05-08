import { Link } from '@inertiajs/react';

export const CreateEventTab = () => {
    return (
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
    );
};
