<?php 

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'image_url' => null, // Set to null to use placeholder image
            'start_date' => fake()->dateTimeBetween('now', '+1 month'),
            'end_date' => fake()->dateTimeBetween('+1 month', '+2 months'),
            'location' => fake()->address(),
            'user_id' => User::factory(),
        ];
    }
    
    /**
     * Define a past event.
     */
    public function past(): static
    {
        return $this->state(fn (array $attributes) => [
            'start_date' => fake()->dateTimeBetween('-2 months', '-1 month'),
            'end_date' => fake()->dateTimeBetween('-1 month', '-1 week'),
        ]);
    }
    
    /**
     * Define an event with no end date.
     */
    public function noEndDate(): static
    {
        return $this->state(fn (array $attributes) => [
            'end_date' => null,
        ]);
    }
}