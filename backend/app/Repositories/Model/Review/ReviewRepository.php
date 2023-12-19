<?php

namespace App\Repositories\Model\Review;

use App\Repositories\BaseModelRepository;

class ReviewRepository extends BaseModelRepository implements ReviewRepositoryInterface
{
    public function getModel()
    {
        return \App\Models\Review::class;
    }
}
