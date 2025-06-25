import { MainLayout } from '@/layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { FaCalendarAlt, FaLock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';

export default function AboutIndex() {
    return (
        <MainLayout>
            <Head title={'About Us'} />

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 py-16 text-white">
                <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center">
                        <h1 className="max-w-3xl text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            Connecting Communities Through Events
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium">
                            A platform where people discover, create, and share meaningful experiences.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mission Statement */}
            <div className="bg-white py-16">
                <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
                        <div className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
                            <p className="mb-4">
                                We believe that community happens when people share experiences. Our mission is to connect people through events that
                                matter to them and facilitate meaningful connections in an increasingly digital world.
                            </p>
                            <p>
                                Whether you're looking to attend a local meetup, organize a major conference, or simply discover what's happening in
                                your area, our platform makes it seamless to engage with your community.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
                        <p className="mt-4 text-lg text-gray-600">Key features that make our platform stand out</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Feature 1 */}
                        <div className="rounded-lg bg-white p-6 shadow-md transition-transform hover:-translate-y-1">
                            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-100 p-3">
                                <FaUsers className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900">Community Focused</h3>
                            <p className="mt-2 text-gray-600">
                                Built by community organizers for community builders. We understand what makes events successful.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="rounded-lg bg-white p-6 shadow-md transition-transform hover:-translate-y-1">
                            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-100 p-3">
                                <FaCalendarAlt className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900">Easy Event Management</h3>
                            <p className="mt-2 text-gray-600">Create, manage, and promote your events with our intuitive tools and analytics.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="rounded-lg bg-white p-6 shadow-md transition-transform hover:-translate-y-1">
                            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-100 p-3">
                                <FaMapMarkerAlt className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900">Discover Local Events</h3>
                            <p className="mt-2 text-gray-600">
                                Find events in your area that match your interests and connect with like-minded people.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="rounded-lg bg-white p-6 shadow-md transition-transform hover:-translate-y-1">
                            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-blue-100 p-3">
                                <FaLock className="h-6 w-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900">Privacy First</h3>
                            <p className="mt-2 text-gray-600">Your data privacy is our priority. We never sell your information to third parties.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team/Company Section */}
            <div className="bg-white py-16">
                <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
                        <p className="mt-4 text-lg text-gray-600">Passionate about building communities</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="max-w-3xl text-center">
                            <p className="text-lg text-gray-600">
                                We're a dedicated team of developers, designers, and community organizers passionate about bringing people together.
                                Founded in 2025, we've been working to reimagine how people discover and participate in events.
                            </p>
                            <p className="mt-4 text-lg text-gray-600">
                                Based in Aarhus, Denmark, we're a growing team focused on creating technology that makes community building easier and
                                more accessible for everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 py-12">
                <div className="max-w-page mx-auto px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-white">Ready to discover events near you?</h2>
                    <p className="mt-4 text-lg text-blue-100">Join thousands of people finding and creating events in their communities.</p>
                    <div className="mt-8">
                        <a
                            href="/register"
                            className="inline-flex items-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-blue-700 transition-colors hover:bg-blue-50"
                        >
                            Sign up for free
                        </a>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
