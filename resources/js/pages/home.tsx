import { MainLayout } from '@/layouts/MainLayout';
import { formatDate } from '@/lib/utils';
import { Event } from '@/types';
import { IAuth } from '@/types/user';
import { Head, Link } from '@inertiajs/react';

interface HomeProps {
    auth: IAuth;
    events?: Event[];
}

export default function Home({ auth, events = [] }: HomeProps) {
    return (
        <MainLayout>
            <Head title="Home" />

            <main className="max-w-page relative mx-auto">
                {/* Hero section */}
                <div className="home-hero relative min-h-[500px] bg-gradient-to-br from-blue-500 to-purple-600">
                    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center py-16 lg:flex-row lg:items-start lg:gap-12">
                            {/* Left column: Text content */}
                            <div className="flex-1 text-center lg:text-left">
                                <h1 className="font-poppins text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                                    Find amazing events <br className="hidden lg:inline" />
                                    <span className="text-blue-200">near you</span>
                                </h1>
                                <p className="mx-auto mt-6 max-w-md text-lg font-medium text-blue-100 lg:mx-0">
                                    Connect with people who share your interests. Discover events, create your own, and build a community.
                                </p>
                                <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
                                    <Link
                                        href={route('events.index')}
                                        className="rounded-md bg-white px-5 py-3 text-base font-medium text-blue-600 shadow-sm transition duration-300 hover:bg-blue-50"
                                    >
                                        Browse Events
                                    </Link>
                                    {auth.user ? (
                                        <Link
                                            href={route('events.create')}
                                            className="rounded-md border border-blue-100 bg-transparent px-5 py-3 text-base font-medium text-white transition duration-300 hover:border-blue-50 hover:bg-blue-700"
                                        >
                                            Create an Event
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('login')}
                                            className="rounded-md border border-blue-100 bg-transparent px-5 py-3 text-base font-medium text-white transition duration-300 hover:border-blue-50 hover:bg-blue-700"
                                        >
                                            Sign In
                                        </Link>
                                    )}
                                </div>
                            </div>

                            {/* Right column: Image */}
                            {/* <div className="mt-14 flex-1 lg:mt-0">
                                <div className="relative mx-auto max-w-lg lg:max-w-none">
                                    <div className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10">
                                        <img
                                            src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                            alt="People at an event"
                                            className="h-full w-full object-cover"
                                            style={{ aspectRatio: '4/3' }}
                                        />
                                    </div>
                                    <div className="absolute -top-6 -right-6 -z-10 aspect-square w-1/2 rounded-full bg-blue-400 opacity-30 blur-3xl"></div>
                                    <div className="absolute -bottom-6 -left-6 -z-10 aspect-square w-1/2 rounded-full bg-purple-400 opacity-30 blur-3xl"></div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* Wave at the bottom */}
                    <svg
                        className="absolute bottom-0 left-0 w-full text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="currentColor"
                            fillOpacity="1"
                            d="M0,192L80,186.7C160,181,320,171,480,181.3C640,192,800,224,960,229.3C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                        ></path>
                    </svg>
                </div>

                {/* Events section */}
                <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Upcoming Events</h2>
                        <Link href={route('events.index')} className="text-sm leading-6 font-semibold text-blue-600 hover:text-blue-500">
                            View all events <span aria-hidden="true">→</span>
                        </Link>
                    </div>

                    {events.length > 0 ? (
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                            {events.map((event) => (
                                <div key={event.id} className="group relative overflow-hidden rounded-lg bg-white shadow">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200">
                                        <img
                                            src={`https://source.unsplash.com/random/800x600/?event&sig=${event.id}`}
                                            alt={event.name}
                                            className="h-48 w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl leading-6 font-semibold text-gray-900">
                                            <Link
                                                href={route('events.show', {
                                                    event: event.id,
                                                })}
                                            >
                                                {event.name}
                                            </Link>
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            {formatDate(event.start_date)}
                                            {event.location && ` • ${event.location}`}
                                        </p>
                                        <p className="mt-3 mb-3 line-clamp-2 text-sm text-gray-700">
                                            {event.description || 'No description provided.'}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{event.attending_count} attending</span>
                                            <span className="text-xs text-gray-500">by {event.user?.name || 'Unknown'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="py-10 text-center text-gray-500">No upcoming events at the moment.</p>
                    )}
                </div>
            </main>
        </MainLayout>
    );
}
