import { Head, useForm } from '@inertiajs/react';

import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MainLayout } from '@/layouts/MainLayout';

export default function EventCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        image_url: '',
        start_date: '',
        end_date: '',
        location: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('events.store'));
    }

    return (
        <MainLayout>
            <Head title="Create Event" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-white p-6">
                            <h1 className="mb-6 text-2xl font-bold">Create a New Event</h1>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Event Name <span className="text-red-600">*</span>
                                    </Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.name && <div className="mt-1 text-sm text-red-500">{errors.name}</div>}
                                </div>

                                <div>
                                    <Label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                        Image URL (Optional)
                                    </Label>
                                    <Input
                                        type="text"
                                        id="image"
                                        value={data.image_url}
                                        onChange={(e) => setData('image_url', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.name && <div className="mt-1 text-sm text-red-500">{errors.name}</div>}
                                </div>

                                <div>
                                    <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={5}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.description && <div className="mt-1 text-sm text-red-500">{errors.description}</div>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                                            Start Date & Time <span className="text-red-600">*</span>
                                        </Label>
                                        <Input
                                            type="datetime-local"
                                            id="start_date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                        {errors.start_date && <div className="mt-1 text-sm text-red-500">{errors.start_date}</div>}
                                    </div>

                                    <div>
                                        <Label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                                            End Date & Time (Optional)
                                        </Label>
                                        <Input
                                            type="datetime-local"
                                            id="end_date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                        {errors.end_date && <div className="mt-1 text-sm text-red-500">{errors.end_date}</div>}
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                        Location (Optional)
                                    </Label>
                                    <Input
                                        type="text"
                                        id="location"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.location && <div className="mt-1 text-sm text-red-500">{errors.location}</div>}
                                </div>

                                <div className="mt-4 flex items-center justify-end">
                                    <Button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="mr-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold tracking-widest text-gray-700 uppercase shadow-sm transition hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-25"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:bg-blue-700 disabled:opacity-25"
                                    >
                                        {processing ? 'Creating...' : 'Create Event'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
