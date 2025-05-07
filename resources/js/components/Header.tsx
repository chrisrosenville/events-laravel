import { useInitials } from '@/hooks/use-initials';
import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface PagePropsWithAuth {
    auth: {
        user: User | null;
    };
    [key: string]: unknown;
}

export const Header = () => {
    const { auth } = usePage<PagePropsWithAuth>().props;
    const getInitials = useInitials();

    return (
        <header className="h-16 border-b border-b-gray-200 bg-white text-black shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center">
                    <Link href="/" className="text-xl font-bold text-blue-600">
                        {import.meta.env.VITE_APP_NAME || 'Evinent'}
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex h-full items-center gap-4 text-inherit">
                    <nav>
                        <ul className="flex gap-8">
                            <li className="group/nav-item">
                                <Link href="/" className="text-sm font-medium text-inherit">
                                    Home
                                </Link>
                                <div className="h-[1px] w-0 rounded-lg bg-black transition-all ease-in-out group-hover/nav-item:w-full"></div>
                            </li>
                            <li className="group/nav-item">
                                <Link href="/events" className="text-sm font-medium text-inherit">
                                    Events
                                </Link>
                                <div className="h-[1px] w-0 rounded-lg bg-black transition-all ease-in-out group-hover/nav-item:w-full"></div>
                            </li>
                            <li className="group/nav-item">
                                <Link href="/about" className="text-sm font-medium text-inherit">
                                    About
                                </Link>
                                <div className="h-[1px] w-0 rounded-lg bg-black transition-all ease-in-out group-hover/nav-item:w-full"></div>
                            </li>
                        </ul>
                    </nav>

                    <div className="mx-4 h-1/2 w-[1px] rounded-lg bg-neutral-300"></div>

                    {/* User menu or auth links */}
                    <div className="flex items-center">
                        {auth.user ? (
                            <div className="relative">
                                {/* Dropdown toggle button */}
                                <button
                                    className="relative flex items-center focus:outline-none"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const dropdown = document.getElementById('user-dropdown');
                                        if (dropdown) {
                                            dropdown.classList.toggle('hidden');
                                        }
                                    }}
                                >
                                    <div className="size-8 cursor-pointer rounded-full text-gray-700 hover:opacity-80">
                                        {auth.user.avatar ? (
                                            <img src={auth.user.avatar} alt={auth.user.name} className="h-full w-full rounded-full object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-500 text-white">
                                                {getInitials(auth.user.name)}
                                            </div>
                                        )}
                                    </div>
                                </button>

                                {/* Dropdown menu */}
                                <div
                                    id="user-dropdown"
                                    className="absolute right-0 z-50 mt-2 hidden w-56 rounded-md border border-gray-100 bg-white py-2 shadow-lg"
                                >
                                    {/* User info */}
                                    <div className="p-2 text-sm font-medium">
                                        <p className="truncate">{auth.user.name}</p>
                                        <p className="truncate text-xs text-gray-500">{auth.user.email}</p>
                                    </div>

                                    {/* Divider */}
                                    <hr className="mx-2 my-1 border-gray-200" />

                                    {/* Menu items */}
                                    <Link href="/dashboard" className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                                        Dashboard
                                    </Link>

                                    {/* Divider */}
                                    <hr className="mx-2 my-1 border-gray-200" />

                                    {/* Logout button */}
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 hover:text-red-700"
                                    >
                                        Log out
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Log in
                                </Link>
                                <Link href="/register" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};
