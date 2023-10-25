<?php

namespace App\Repositories\Model\Product;

use App\Repositories\ModelRepositoryInterface;

interface ProductRepositoryInterface extends ModelRepositoryInterface
{
    public function addMedia($product, $listMedia);
    public function addCategories($product, $listCategories);
}
