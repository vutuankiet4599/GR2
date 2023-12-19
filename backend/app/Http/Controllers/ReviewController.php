<?php

namespace App\Http\Controllers;

use App\Http\Requests\Review\CreateReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use App\Repositories\Model\Review\ReviewRepository;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    use ResponseTrait;

    private $repository;

    public function __construct(ReviewRepository $repository)
    {
        $this->repository = $repository;
    }

    public function product(Request $request, $id)
    {
        $data = Review::with('user')
            ->where('product_id', $id)
            ->orderBy('created_at', 'desc')
            ->paginate(config('app.items_per_page'));
        return $this->success(ReviewResource::collection($data)->response()->getData());
    }

    public function insert(CreateReviewRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = $request->user()->id;

        $response = $this->repository->create($validated);

        if (!$response) {
            return $this->failure([], 'Create failed', 400);
        }

        return $this->success(new ReviewResource($response->load('user')));
    }
}
