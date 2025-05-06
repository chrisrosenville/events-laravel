// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';
import InputError from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { MainLayout } from '@/layouts/MainLayout';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<{ password: string }>>({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <MainLayout>
            <Head title="Confirm password" />

            <div className="min-h-svh p-4 sm:p-8">
                <form onSubmit={submit} className="mx-auto flex max-w-xl flex-col gap-6 py-4">
                    <div className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                value={data.password}
                                autoFocus
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center">
                            <Button className="flex w-full items-center justify-center bg-blue-500 text-white" disabled={processing}>
                                {processing ? <LoaderCircle className="h-6 w-6 animate-spin" /> : 'Confirm password'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
