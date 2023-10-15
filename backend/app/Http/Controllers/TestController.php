<?php

namespace App\Http\Controllers;

use App\Repositories\Model\User\UserRepository;
use Illuminate\Support\Facades\Auth;

class TestController extends Controller
{
    protected $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        return response()->json([
            'data' => $this->repository->getOneWithByEmailLikeOrIdEq('jess', 1),
            'user' => Auth::user(),
        ]);
    }
}
