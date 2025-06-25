<?php

use App\Models\User;
use App\Models\Event;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

Schedule::call(function () {
    try {
        // Create a new user
        $user = User::factory()->create();

        // Create a new event for this user
        $event = Event::factory()->create([
            'user_id' => $user->id,
        ]);

        Log::info('Successfully created new user and event', [
            'user_id' => $user->id,
            'event_id' => $event->id
        ]);
    } catch (\Exception $e) {
        Log::error('Failed to create scheduled user and event', [
            'error' => $e->getMessage()
        ]);
    }
})->name('create-daily-event')
  ->description('Create a new event with a new user every 24 hours')
  ->daily();

Schedule::call(function () {
    try {
        $deletedCount = DB::table('events')
            ->where('end_date', '<', now())
            ->delete();

        Log::info('Successfully cleaned up past events', [
            'deleted_count' => $deletedCount
        ]);
    } catch (\Exception $e) {
        Log::error('Failed to clean up past events', [
            'error' => $e->getMessage()
        ]);
    }
})->name('cleanup-past-events')
  ->description('Delete events that have already ended')
  ->daily();


