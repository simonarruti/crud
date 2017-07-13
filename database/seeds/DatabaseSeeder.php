<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(\App\Category::class, 2)->create();

        for ($i = 0; $i < 7; $i++) {
            factory(\App\Post::class)->create(array("category_id" => random_int(1, 2)));
        }
    }
}
