<?php

namespace App\Repositories\Model\Role;

use App\Repositories\BaseModelRepository;

class RoleRepository extends BaseModelRepository implements RoleRepositoryInterface
{
    public function getModel()
    {
        return \App\Models\Role::class;
    }
}
