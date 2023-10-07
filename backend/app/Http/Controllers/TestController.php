<?php

namespace App\Http\Controllers;

class TestController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => [
                'data 1', 'data 2',
            ],
        ]);
    }
}
