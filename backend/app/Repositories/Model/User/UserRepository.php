<?php

namespace App\Repositories\Post;

use App\Repositories\BaseModelRepository;
use App\Repositories\Product\ProductRepositoryInterface;

class ProductRepository extends BaseModelRepository implements ProductRepositoryInterface
{
    public function getModel()
    {
        return \App\Models\User::class;
    }
}
