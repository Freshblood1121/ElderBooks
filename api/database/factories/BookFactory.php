<?php

namespace Database\Factories;

use App\Enums\BooksStatus;
use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => fake()->uuid(),
            'title' => fake()->jobTitle(),
            'category_id' => fake()->uuid(),
            'author' => fake()->name(),
            'company' => fake()->company(),
            'description'=> fake()->text(100),
            'age' => fake()->year(),
            'status' => BooksStatus::MEDIUM->value,
            'image' => fake()->imageUrl(),
            'created_at' => now(),
            'updated_at' => now(),
            'price' => fake()->numberBetween(10, 50000),
        ];
    }
}
