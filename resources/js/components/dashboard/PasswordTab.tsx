import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';
import { InputError } from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';

interface PasswordFormData {
    current_password: string;
    password: string;
    password_confirmation: string;
}

interface PasswordTabProps {
    passwordData: PasswordFormData;
    errors: Record<string, string>;
    processing: boolean;
    success: boolean;
    setPasswordData: (key: keyof PasswordFormData, value: string) => void;
    submitPassword: FormEventHandler;
}

export const PasswordTab = ({ passwordData, errors, processing, success, setPasswordData, submitPassword }: PasswordTabProps) => {
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
                <div>
                    <h2 className="text-lg font-medium text-gray-900">Update Password</h2>
                    <p className="mt-1 text-sm text-gray-600">Ensure your account is using a long, random password to stay secure.</p>

                    <form onSubmit={submitPassword} className="mt-6 space-y-6">
                        <div>
                            <Label htmlFor="current_password">Current Password</Label>
                            <Input
                                id="current_password"
                                type="password"
                                name="current_password"
                                value={passwordData.current_password}
                                onChange={(e) => setPasswordData('current_password', e.target.value)}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                            />
                            <InputError message={errors.current_password} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={passwordData.password}
                                onChange={(e) => setPasswordData('password', e.target.value)}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={passwordData.password_confirmation}
                                onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

                            {success && <p className="text-sm text-green-600">Saved.</p>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
