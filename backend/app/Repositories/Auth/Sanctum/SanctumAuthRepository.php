<?php

namespace App\Repositories\Auth\Sanctum;

use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use App\Traits\ImageTrait;
use Illuminate\Support\Facades\Auth;

class SanctumAuthRepository implements SanctumAuthRepositoryInterface
{
    use ImageTrait;

    public function login($email, $password)
    {
        if (!Auth::attempt(["email" => $email, "password" => $password])) {
            return ['success' => false];
        }

        $user = User::where('email', $email)->first();

        if (!$user->is_active) {
            return ['success' => false];
        }
        
        $token = $user->createToken('api-token')->plainTextToken;

        return [
            'success' => true,
            'data' => [
                'token' => $token,
                'user' => $user->load('role'),
            ],
        ];
    }

    public function register($data)
    {
        $avatarLink = '';

        if (isset($data['avatar'])) {
            $avatarLink = $this->uploadImageToStorage($data['avatar'], 'users');
        }

        $role = Role::where('name', '=', "GUEST")->first();

        $user = User::create(array_merge($data, ['avatar' => $avatarLink['link'], 'role_id' => $role->id]));

        return [
            'success' => true,
            'data' => [
                'token' => $user->createToken('api-token')->plainTextToken,
                'user' => $user->load('role'),
            ],
        ];
    }

    public function logout($user)
    {
        $user->tokens()->delete();

        return [
            'success' => true,
            'data' => [],
        ];
    }

    public function user($user)
    {
        return [
            'success' => true,
            'data' => [
                'user' => new UserResource($user->load('role')),
            ],
        ];
    }
}
