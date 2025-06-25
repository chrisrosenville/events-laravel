<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create a test user for easier login during development
        $testUser = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
        
        // Create 10 regular users
        $users = User::factory(10)->create();
        $users->add($testUser);
        $allUsers = $users;
        
        // Create 20 upcoming events
        $upcomingEvents = Event::factory(20)
            ->recycle($allUsers) // Assign random users as creators
            ->create();
            
        // Create 5 past events
        $pastEvents = Event::factory(5)
            ->past()
            ->recycle($allUsers)
            ->create();
            
        // Assign random attendees to events
        $allEvents = $upcomingEvents->concat($pastEvents);
        
        foreach ($allEvents as $event) {
            // Each event gets a random number of attendees (0-8)
            $attendees = $allUsers->random(rand(0, 8));
            
            if ($attendees->count() > 0) {
                $event->attendees()->attach($attendees->pluck('id'));
                
                // Update attending_count if you have this column
                if (in_array('attending_count', $event->getFillable())) {
                    $event->update(['attending_count' => $attendees->count()]);
                }
            }
        }
    }
}
