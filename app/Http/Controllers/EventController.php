<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of events.
     */
    public function index()
    {
        $events = Event::with('user')
            ->where('start_date', '>=', now())
            ->orderBy('start_date')
            ->get();
            
        return Inertia::render('events/index', [
            'events' => $events
        ]);
    }

    /**
     * Show the form for creating a new event.
     */
    public function create()
    {
        return Inertia::render('events/create');
    }

    /**
     * Store a newly created event in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'location' => 'nullable|string|max:255',
        ]);
        
        $event = $request->user()->events()->create($validated);
        
        return redirect()->route('events.show', $event)
            ->with('success', 'Event created successfully!');
    }

    /**
     * Display the specified event.
     */
    public function show(Event $event)
    {
        $event->load('user', 'attendees');
        
        $isAttending = false;
        if (auth()->check()) {
            $isAttending = $event->isUserAttending(auth()->id());
        }
        
        return Inertia::render('events/show', [
            'event' => $event,
            'isAttending' => $isAttending,
            'attendeeCount' => $event->attendees->count()
        ]);
    }

    /**
     * Show the form for editing the specified event.
     */
    public function edit(Event $event)
    {
        // Check if the authenticated user is the owner of this event
        $this->authorize('update', $event);
        
        return Inertia::render('events/edit', [
            'event' => $event
        ]);
    }

    /**
     * Update the specified event in storage.
     */
    public function update(Request $request, Event $event)
    {
        // Check if the authenticated user is the owner of this event
        $this->authorize('update', $event);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'location' => 'nullable|string|max:255',
        ]);
        
        $event->update($validated);
        
        return redirect()->route('events.show', $event)
            ->with('success', 'Event updated successfully!');
    }

    /**
     * Remove the specified event from storage.
     */
    public function destroy(Event $event)
    {
        // Check if the authenticated user is the owner of this event
        $this->authorize('delete', $event);
        
        $event->delete();
        
        return redirect()->route('events.index')
            ->with('success', 'Event deleted successfully!');
    }
    
    /**
     * Allow a user to attend an event.
     */
    public function attend(Event $event)
    {
        $user = auth()->user();
        
        // Check if user is already attending
        if (!$event->isUserAttending($user->id)) {
            $event->attendees()->attach($user->id);
            $event->increment('attending_count');
        }
        
        return redirect()->back()->with('success', 'You are now attending this event!');
    }
    
    /**
     * Allow a user to unattend an event.
     */
    public function unattend(Event $event)
    {
        $user = auth()->user();
        
        if ($event->isUserAttending($user->id)) {
            $event->attendees()->detach($user->id);
            $event->decrement('attending_count');
        }
        
        return redirect()->back()->with('success', 'You are no longer attending this event.');
    }
}
