<?php

namespace App\Repositories\Model\Category;

use App\Repositories\BaseModelRepository;

class CategoryRepository extends BaseModelRepository implements CategoryRepositoryInterface
{
    public function getModel()
    {
        return \App\Models\Category::class;
    }
}
