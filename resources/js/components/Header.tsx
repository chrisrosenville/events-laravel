import { useInitials } from '@/hooks/use-initials';
import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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
                                <div className="h-[1px] w-0 rounded-lg bg-black transition-all ease-in-out group-hover/nav-item:w-full dark:bg-white"></div>
                            </li>
                            <li className="group/nav-item">
                                <Link href="/events" className="text-sm font-medium text-inherit">
                                    Events
                                </Link>
                                <div className="h-[1px] w-0 rounded-lg bg-black transition-all ease-in-out group-hover/nav-item:w-full dark:bg-white"></div>
                            </li>
                            <li className="group/nav-item">
                                <Link href="/about" className="text-sm font-medium text-inherit">
                                    About
                                </Link>
                                <div className="h-[1px] w-0 rounded-lg bg-black transition-all ease-in-out group-hover/nav-item:w-full dark:bg-white"></div>
                            </li>
                        </ul>
                    </nav>

                    <div className="mx-4 h-1/2 w-[1px] rounded-lg bg-neutral-300"></div>

                    {/* User menu or auth links */}
                    <div className="flex items-center">
                        {auth.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="focus:outline-none">
                                    <Avatar className="size-8 cursor-pointer hover:opacity-80">
                                        {auth.user.avatar ? (
                                            <img src={auth.user.avatar} alt={auth.user.name} />
                                        ) : (
                                            <AvatarFallback className="bg-blue-500 text-white">{getInitials(auth.user.name)}</AvatarFallback>
                                        )}
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <div className="p-2 text-sm font-medium">
                                        <p className="truncate">{auth.user.name}</p>
                                        <p className="truncate text-xs text-gray-500">{auth.user.email}</p>
                                    </div>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard" className="cursor-pointer">
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="w-full cursor-pointer text-left text-red-600 hover:text-red-700"
                                        >
                                            Log out
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
