<?php

namespace App\Repositories\Auth\Sanctum;

use App\Http\Resources\UserResource;
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

        $user->currentAccessToken()->delete();
        $token = $user->createToken('api-token')->plainTextToken;

        return [
            'success' => true,
            'data' => [
                'token' => $token,
                'user' => $user,
            ],
        ];
    }

    public function register($data)
    {
        $avatarLink = '';

        if (isset($data['avatar'])) {
            $avatarLink = $this->uploadImageToStorage($data['avatar'], 'users');
        }

        $user = User::create(array_merge($data, ['avatar' => $avatarLink]));

        return [
            'success' => true,
            'data' => [
                'token' => $user->createToken('api-token')->plainTextToken,
                'user' => $user,
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
                'user' => new UserResource($user),
            ],
        ];
    }
}
