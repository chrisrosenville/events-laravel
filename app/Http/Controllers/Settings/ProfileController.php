<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
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
            'activeTab' => 'profile' // Pass the active tab to show the profile tab by default
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)->ignore($user->id)],
        ]);

        $emailChanged = $user->email !== $validated['email'];
        
        $user->fill($validated);
        
        if ($emailChanged) {
            $user->email_verified_at = null;
        }
        
        $user->save();

        // Keep the original redirect to maintain test compatibility
        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
