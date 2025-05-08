<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordController extends Controller
{
    /**
     * Show the user's password settings page.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        
        // Get events created by the user
        $createdEvents = $user->events()
            ->orderBy('start_date', 'asc')
            ->get();
            
        // Get events the user is attending
        $attendingEvents = $user->attendingEvents()
            ->with('user')
            ->where('start_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->get();
        
        return Inertia::render('dashboard', [
            'user' => $user,
            'createdEvents' => $createdEvents,
            'attendingEvents' => $attendingEvents,
            'activeTab' => 'password' // Pass the active tab to show the password tab by default
        ]);
    }

    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return Redirect::route('dashboard');
    }
}
