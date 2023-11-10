<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\CreateProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Repositories\Model\Product\ProductRepository;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    use ResponseTrait;

    private $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }

    public function userProducts(Request $request)
    {
        $resource = ProductResource::collection(
            $this->repository->getPaginateWithMediaByUseridEq($request->user()->id)
        );

        if ($resource->all() == null) {
            return $this->success(["data" => [], "meta" => []], 'Found empty category');
        }

        return $this->success($resource->response()->getData());
    }

    public function userProduct(Request $request, $id)
    {
        $product = $this->repository->find($id)->load(['media', 'categories']);

        if ($product == null) {
            return $this->failure([], 'Product not found', 404);
        }

        return $this->success(new ProductResource($product));
    }

    public function insert(CreateProductRequest $request)
    {
        $validated = $request->validated();

        $validated['user_id'] = $request->user()->id;

        $product = $this->repository->create($validated);

        $links = $this->repository->addMedia($product, $validated['media']);

        $this->repository->addCategories($product, $validated['categories']);

        return $this->success(['data' => $validated, 'meta' => $links], "Created Successfully");
    }

    public function update(UpdateProductRequest $request, $id)
    {
        $validated = $request->validated();

        $this->repository->update($id, $validated);

        return $this->success(['data' => $validated], "Updated Successfully");
    }

    public function delete(Request $request, $id)
    {
        $this->repository->delete($id);

        return $this->success([], "Product deleted successfully");
    }
}
