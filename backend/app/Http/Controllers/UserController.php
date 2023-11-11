<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Requests\UserUpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Repositories\Model\User\UserRepository;
use App\Traits\ResponseTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use ResponseTrait;

    private $repository;

    public function __construct(UserRepository $repository) {
        $this->repository = $repository;
    }

    public function index()
    {
        $resource = UserResource::collection(
            $this->repository->getPaginateByRoleidNe(1)
        );

        if ($resource->all() == null) {
            return $this->failure([], 'No thing founded', 404);
        }

        return $this->success($resource->response()->getData());
    }

    public function show(Request $request, $id)
    {
        $user = $this->repository->find($id);

        $user->load('reviews', 'products', 'role');

        if ($user == null) {
            return $this->failure([], 'No thing founded', 404);
        }

        return $this->success(new UserResource($user));
    }

    public function insert(CreateUserRequest $request)
    {
        $validated = $request->validated();
        $validated['email_verified'] = Carbon::now();
        $validated['remember_token'] = Str::random(10);
        $validated['password'] = Hash::make('123456');

        $respone = $this->repository->create($validated);

        if (!$respone) {
            return $this->failure([], "Couldn't create user");
        }

        return $this->success(new UserResource($respone), "User created successfully", 201);
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $validated = $request->validated();

        $response = $this->repository->update($id, $validated);

        if (!$response) {
            return $this->failure([], "User update failed");
        }

        return $this->success([], "User update succeeded");
    }

    public function updateStatus(UserUpdateUserRequest $request, $id)
    {
        $validated = $request->validated();

        $respone = $this->repository->update($id, $validated);

        if (!$respone) {
            return $this->failure([], 'Update failed');
        }

        return $this->success([], 'Updated successfully');
    }
}
