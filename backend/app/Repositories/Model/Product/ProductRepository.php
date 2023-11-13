<?php

namespace App\Repositories\Model\Product;

use App\Repositories\BaseModelRepository;
use App\Traits\ImageTrait;

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
        return $this->model->with('media')->latest()->take(10)->get();
    }

    public function topOrderedProducts()
    {
        return $this->model->with('media')->withCount('orders')->orderBy('orders_count', 'desc')->take(10)->get();
    }
}
