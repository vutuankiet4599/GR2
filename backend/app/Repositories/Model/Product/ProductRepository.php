<?php

namespace App\Repositories\Model\Product;

use App\Repositories\BaseModelRepository;

class ProductRepository extends BaseModelRepository implements ProductRepositoryInterface
{
    public function getModel()
    {
        return \App\Models\Product::class;
    }
}
