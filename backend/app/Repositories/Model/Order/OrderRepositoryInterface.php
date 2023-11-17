<?php

namespace App\Repositories\Model\Order;

use App\Repositories\ModelRepositoryInterface;

interface OrderRepositoryInterface extends ModelRepositoryInterface
{
    public function insertMany($data);
}
