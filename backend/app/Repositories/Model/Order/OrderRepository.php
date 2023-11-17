<?php

namespace App\Repositories\Model\Order;

use App\Repositories\BaseModelRepository;
use Illuminate\Support\Facades\DB;

class OrderRepository extends BaseModelRepository implements OrderRepositoryInterface
{
    public function getModel()
    {
        return \App\Models\Order::class;
    }

    public function insertMany($data)
    {
        $res = DB::table($this->model->getTable())->insert($data);
        return $res;
    }
}
