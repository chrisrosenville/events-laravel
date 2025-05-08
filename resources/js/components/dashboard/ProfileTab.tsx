import { Button } from '@/components/buttons/Button';
import { Input } from '@/components/ui/input';
import { InputError } from '@/components/ui/input-error';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';

interface ProfileFormData {
    name: string;
    email: string;
}

interface DeleteAccountFormData {
    password: string;
}

interface ProfileTabProps {
    userData: {
        name: string;
        email: string;
    };
    profileData: ProfileFormData;
    deleteData: DeleteAccountFormData;
    profileErrors: Record<string, string>;
    deleteErrors: Record<string, string>;
    profileProcessing: boolean;
    deleteProcessing: boolean;
    profileSuccess: boolean;
    setProfileData: (key: keyof ProfileFormData, value: string) => void;
    setDeleteData: (key: keyof DeleteAccountFormData, value: string) => void;
    submitProfile: FormEventHandler;
    confirmUserDeletion: FormEventHandler;
}

export const ProfileTab = ({
    profileData,
    deleteData,
    profileErrors,
    deleteErrors,
    profileProcessing,
    deleteProcessing,
    profileSuccess,
    setProfileData,
    setDeleteData,
    submitProfile,
    confirmUserDeletion,
}: ProfileTabProps) => {
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
                        <p className="mt-1 text-sm text-gray-600">Update your account's profile information and email address.</p>
                    </div>

                    <form onSubmit={submitProfile} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={profileData.name}
                                onChange={(e) => setProfileData('name', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={profileErrors.name} className="mt-2" />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData('email', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={profileErrors.email} className="mt-2" />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button disabled={profileProcessing}>Save</Button>

                            {profileSuccess && <p className="text-sm text-green-600">Saved.</p>}
                        </div>
                    </form>

                    <div className="border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-medium text-gray-900">Delete Account</h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Once your account is deleted, all of its resources and data will be permanently deleted.
                        </p>

                        <form onSubmit={confirmUserDeletion} className="mt-4">
                            <div className="mt-4">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={deleteData.password}
                                    onChange={(e) => setDeleteData('password', e.target.value)}
                                    className="mt-1 block w-full"
                                    placeholder="Enter your password to confirm"
                                    required
                                />
                                <InputError message={deleteErrors.password} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <Button disabled={deleteProcessing} className="bg-red-600 text-white hover:bg-red-700">
                                    Delete Account
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
