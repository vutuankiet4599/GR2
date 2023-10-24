<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            ['id' => 1, 'name' => 'SUPER_ADMIN'],
            ['id' => 2, 'name' => 'OWNER'],
            ['id' => 3, 'name' => 'GUEST'],
        ]);
        User::create([
            'name' => 'superadmin',
            'email' => 'vutuankiet4599@gmail.com',
            'email_verified_at' => now(),
            'password' => Hash::make('123456'),
            'remember_token' => Str::random(10),
            'phone' => '0348080406',
            'role_id' => 1,
            'is_active' => true,
        ]);
        User::factory(10)->create();
    }
}
