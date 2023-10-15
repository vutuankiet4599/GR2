<?php

namespace App\Repositories\Model\User;

use App\Repositories\BaseModelRepository;

class UserRepository extends BaseModelRepository implements UserRepositoryInterface
{
    public function getModel()
    {
        return \App\Models\User::class;
    }
}
