<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the user dashboard with their events and settings.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Get events created by the user
        $createdEvents = $user->events()
            ->orderBy('start_date', 'asc')
            ->get();
            
        // Get events the user is attending
        $attendingEvents = $user->attendingEvents()
            ->with('user') // Include the creator of each event
            ->where('start_date', '>=', now())
            ->orderBy('start_date', 'asc')
            ->get();
            
        return Inertia::render('dashboard', [
            'user' => $user,
            'createdEvents' => $createdEvents,
            'attendingEvents' => $attendingEvents,
        ]);
    }
}
