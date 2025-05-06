// Components
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { MainLayout } from '@/layouts/MainLayout';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <MainLayout>
            <Head title="Forgot password" />
            <div className="min-h-svh p-4 sm:p-8">
                {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

                <div className="space-y-6">
                    <form onSubmit={submit} className="mx-auto flex max-w-xl flex-col gap-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                value={data.email}
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                            />

                            <InputError message={errors.email} />
                        </div>

                        <div className="my-6 flex items-center justify-start">
                            <Button className="flex w-full items-center justify-center bg-blue-500 text-white" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Email password reset link
                            </Button>
                        </div>
                    </form>

                    <div className="text-muted-foreground space-x-1 text-center text-sm">
                        <span>Or, return to</span>
                        <Link className="underline underline-offset-4" href={route('login')}>
                            log in
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
