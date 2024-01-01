<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\ChangePasswordRequest;
use App\Http\Requests\Auth\Sanctum\SanctumLoginRequest;
use App\Http\Requests\Auth\Sanctum\SanctumRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Repositories\Auth\Sanctum\SanctumAuthRepository;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use ResponseTrait;

    protected $repository;

    public function __construct(SanctumAuthRepository $repository)
    {
        $this->repository = $repository;
    }

    public function login(SanctumLoginRequest $request)
    {
        $validated = $request->validated();

        $response = $this->repository->login($validated['email'], $validated['password']);

        if (!$response['success']) {
            return $this->failure([], 'Login failed', 401);
        }

        return $this->success($response['data'], 'Login successful');
    }

    public function register(SanctumRegisterRequest $request)
    {
        $validated = $request->validated();

        $response = $this->repository->register($validated);

        if (!$response['success']) {
            return $this->failure([], 'Register failed', 401);
        }

        return $this->success($response['data'], 'Register successful');
    }

    public function logout(Request $request)
    {
        $response = $this->repository->logout($request->user());

        if ($response['success']) {
            return $this->success([], 'Logout successful');
        }

        return $this->failure([], 'Logout failed');
    }

    public function user(Request $request)
    {
        $response = $this->repository->user($request->user());

        if ($response['success']) {
            return $this->success($response['data'], 'Get user successful');
        }

        return $this->failure([], 'Get user failed');
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $validated = $request->validated();

        $user = User::with('role')->find($request->user()->id);
        $newPassword = $validated['new_password'];

        $user->password = Hash::make($newPassword);
        $user->save();

        return $this->success([
            'user' => new UserResource($user),
        ], 'Password reset successful');

        return $this->success($validated);
    }
}
