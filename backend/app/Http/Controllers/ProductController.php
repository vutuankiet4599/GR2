<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\CreateProductRequest;
use App\Http\Requests\Product\SearchProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Repositories\Model\Product\ProductRepository;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use JeroenG\Explorer\Domain\Syntax\Matching;

class ProductController extends Controller
{
    use ResponseTrait;

    private $repository;

    public function __construct(ProductRepository $repository)
    {
        $this->repository = $repository;
    }

    public function home(Request $request)
    {
        $newestProducts = $this->repository->newestProducts();
        $topOrderedProducts = $this->repository->topOrderedProducts();

        return $this->success([
            'newestProducts' => ProductResource::collection($newestProducts),
            'topOrderedProducts' => ProductResource::collection($topOrderedProducts)
        ]);
    }

    public function find(Request $request, $id)
    {
        $product = $this->repository->find($id)->load(['media', 'categories', 'user', 'reviews']);

        if ($product == null) {
            return $this->failure([], "Product not exist", 404);
        };

        return $this->success(new ProductResource($product));
    }

    public function search(SearchProductRequest $request)
    {
        $products = $this->repository->search($request->validated());

        $resource = ProductResource::collection($products['data']);

        if ($resource->all() == null) {
            return $this->success(["data" => [], "meta" => []], 'Found empty products');
        }

        return $this->success(['data' => $resource, 'meta' => $products['meta']]);
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
