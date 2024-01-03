<?php

namespace App\Http\Controllers;

use App\Http\Requests\Order\CreateOrderRequest;
use App\Http\Requests\Order\UpdateOrderStatusRequest;
use App\Http\Resources\OrderResource;
use App\Models\User;
use App\Repositories\Model\Order\OrderRepository;
use App\Traits\ResponseTrait;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    use ResponseTrait;

    private $repository;

    public function __construct(OrderRepository $repository)
    {
        $this->repository = $repository;
    }

    public function currentOwnerOrders(Request $request)
    {
        $user = User::find($request->user()->id);
        $data = $user->requestedOrders()->with(['product', 'user'])->paginate(config('app.items_per_page'));
        
        return $this->success(OrderResource::collection($data)->response()->getData());
    }

    public function orderDetail(Request $request, $id)
    {
        $data = $this->repository->find($id)->load(['product', 'user']);

        return $this->success(OrderResource::collection($data));
    }

    public function currentUserOrders(Request $request)
    {
        $userId = $request->user()->id;
        // $data = $this->repository->getPaginateWithProductByUseridEq($userId);
        $data = User::find($userId)->orders()->with(['product.media'])->paginate(config('app.items_perpage'));

        return $this->success(OrderResource::collection($data)->response()->getData());
    }

    public function find(Request $request, $id)
    {
        $data = $this->repository->find($id)->load(['product.media', 'user']);

        if ($data == null) {
            return $this->failure([], 'Order not found');
        }

        return $this->success(new OrderResource($data));
    }

    public function insert(CreateOrderRequest $request)
    {
        $data = $request->validated();
        $data = $data['data'];
        $userId = $request->user()->id;
        $insertedData = [];

        foreach ($data as $item) {
            $value = [];

            $value['created_at'] = Carbon::now();
            $value['updated_at'] = Carbon::now();
            $value['product_id'] = $item['id'];
            $value['user_id'] = $userId;
            $value['quantity'] = $item['cartQuantity'];
            $value['message'] = '';
            $value['status'] = 'pending';

            array_push($insertedData, $value);
        }

        $res = $this->repository->insertMany($insertedData);

        if (!$res) {
            return $this->failure([], 'Order created failed');
        }

        return $this->success([], 'Order created successfully');
    }

    public function updateStatus(UpdateOrderStatusRequest $request, $id)
    {
        $data = $request->validated();
        $response = $this->repository->update($id, $data);

        if (!$response) {
            return $this->failure([], 'Order update failed');
        }

        return $this->success([], 'Order update successfully');
    }

    public function delete(Request $request, $id)
    {
        $response = $this->repository->delete($id);

        if (!$response) {
            return $this->failure([], 'Order delete failed');
        }

        return $this->success([], 'Order delete successfully');
    }
}
