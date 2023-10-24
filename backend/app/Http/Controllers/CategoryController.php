<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\CreateCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Repositories\Model\Category\CategoryRepository;
use App\Traits\ResponseTrait;

class CategoryController extends Controller
{
    use ResponseTrait;

    private $repository;

    public function __construct(CategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        $resource = CategoryResource::collection(
            $this->repository->getPaginate()
        );

        if ($resource->all() == null) {
            return $this->success(["data" => [], "meta" => []], 'Found empty category');
        }

        return $this->success($resource->response()->getData());
    }

    public function insert(CreateCategoryRequest $request)
    {
        $validated = $request->validated();

        $response = $this->repository->create($validated);

        if (!$response) {
           return $this->failure([], 'Create category failed');
        }

        return $this->success(
            ['category' => $response],
            'Category successfully created',
            201
        );
    }

    public function update(UpdateCategoryRequest $request, $id)
    {
        $validated = $request->validated();

        $response = $this->repository->update($id, $validated);

        if (!$response) {
            return $this->failure([], 'Update category failed');
        }

        return $this->success([], 'Category successfully updated');
    }

    public function delete($id)
    {
        $response = $this->repository->delete($id);

        if (!$response) {
            return $this->failure([], 'Delete category failed');
        }

        return $this->success([], 'Category successfully deleted');
    }
}
