<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Repositories\Model\Role\RoleRepository;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    use ResponseTrait;

    private $repository;

    public function __construct(RoleRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index(Request $request)
    {
        return $this->success(RoleResource::collection($this->repository->getAll()));
    }
}
