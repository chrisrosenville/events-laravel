<?php

namespace App\Controllers\Events;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the events.
     * 
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = Event::where('start_date', '>=', now())
            ->orderBy('start_date')
            ->take(10)
            ->get();

        return response()->json([
            'events' => $events
        ]);
    }
    /**
     * Show the event creation form.
     */
    public function create()
    {
        return view('events.create');
    }

    /**
     * Store a new event.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'location' => 'nullable|string|max:255',
            'attending' => 'nullable',
            'attending_count' => 'nullable|integer',
            'created_by' => 'required|exists:users,id',
        ]);

        $event = Event::create($validated);

        return redirect()->route('events.show', $event);
    }
}