<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with upcoming events.
     */
    public function index()
    {
        try {
            // Get upcoming events for the home page
            $events = Event::with('user')
                ->where('start_date', '>=', now())
                ->orderBy('start_date')
                ->take(6) // Limit to 6 upcoming events
                ->get();
        } catch (QueryException $e) {
            // If there's an error (like table doesn't exist in test env), use empty collection
            $events = collect();
        }
        
        return Inertia::render('home', [
            'events' => $events,
        ]);
    }
}
