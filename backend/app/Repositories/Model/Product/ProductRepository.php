<?php

namespace App\Repositories\Model\Product;

use App\Models\User;
use App\Repositories\BaseModelRepository;
use App\Traits\ImageTrait;
use Illuminate\Support\Facades\DB;
use JeroenG\Explorer\Domain\Syntax\Matching;

class ProductRepository extends BaseModelRepository implements ProductRepositoryInterface
{
    use ImageTrait;

    public function getModel()
    {
        return \App\Models\Product::class;
    }

    public function addMedia($product, $listMedia)
    {
        $listLinks = [];
        foreach ($listMedia as $media) {
            array_push($listLinks, $this->uploadImageToStorage($media, "products/media"));
        }
        $product->media()->createMany($listLinks);

        return true;
    }

    function addCategories($product, $listCategories)
    {
        $product->categories()->attach($listCategories);
        return $product->categories;
    }

    public function newestProducts()
    {
        return $this->model->with('media')->withAvg('reviews', 'ratings')->latest()->take(15)->get();
    }

    public function topOrderedProducts()
    {
        return $this->model->with('media')->withCount('orders')->orderBy('orders_count', 'desc')->take(10)->get();
    }

    public function search($params)
    {
        $products = $this->model->search(isset($params['search']) ? $params['search'] : "") // search
            ->when( // search with address
                isset($params["address"]) && !empty($params["address"]),
                function ($q) use ($params) {
                    return $q->must(new Matching('address', $params['address']));
                }
            )->when( // search with owner name, need whereHas
                isset($params["categories"]) && !empty($params["categories"]),
                function ($q) use ($params) {
                    $productIds = DB::table('category_product')->whereIn('category_id', [1, 2])->pluck('product_id')->toArray();
                    return $q->whereIn('id', $productIds);
                }
            )->when( // search with owner name, need whereHas
                isset($params["owner"]) && !empty($params["owner"]),
                function ($q) use ($params) {
                    $userIds = User::where('name', 'like', '%'.$params['owner'].'%')->pluck('id')->toArray();
                    return $q->whereIn('user_id', $userIds);
                }
            )->when( // sort by created_at
                isset($params["date"]) && !empty($params["date"]),
                function ($q) use ($params) {
                    if ($params['date']) {
                        return $q->orderBy('created_at', 'desc');
                    }
                    return $q->orderBy('created_at');
                }
            )->when( // sort by count of orders, need whereHas
                isset($params["orders"]) && !empty($params["orders"]),
                function ($q) use ($params) {
                    if ($params['orders']) {
                        return $q->orderBy('quantity', 'desc');
                    }
                    return $q->orderBy('quantity');
                }
            )->paginate(config('app.items_per_page'));
            
        $data = [
            'data' => $products->load('media'),
            'meta' => [
                'last_page' => $products->toArray()['last_page'],
                'per_page' => $products->toArray()['per_page'],
                'total' => $products->toArray()['total'],
                'to' => $products->toArray()['to'],
            ],
        ];
        return $data;
    }
}
