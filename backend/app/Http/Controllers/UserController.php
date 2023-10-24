<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Repositories\Model\User\UserRepository;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

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

    public function update(UserUpdateUserRequest $request, $id)
    {
        $validated = $request->validated();

        $respone = $this->repository->update($id, $validated);

        if (!$respone) {
            return $this->failure([], 'Update failed');
        }

        return $this->success([], 'Updated successfully');
    }
}
