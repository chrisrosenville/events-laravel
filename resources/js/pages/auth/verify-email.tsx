// Components
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/buttons/Button';
import { MainLayout } from '@/layouts/MainLayout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <MainLayout>
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing} className="mx-auto flex w-full max-w-xs items-center justify-center bg-blue-500 text-white">
                    {processing ? <LoaderCircle className="h-6 w-6 animate-spin" /> : 'Resend verification email'}
                </Button>

                <Link href={route('logout')} method="post" className="mx-auto block text-sm underline underline-offset-4">
                    Log out
                </Link>
            </form>
        </MainLayout>
    );
}
