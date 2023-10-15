<?php

namespace App\Traits;

trait ResponseTrait
{
    public function success($data = [], $message = '', $status = 200)
    {
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => $message,
        ], $status);
    }

    public function failure($data = [], $message = '', $status = 422)
    {
        return response()->json([
            'success' => false,
            'data' => $data,
            'message' => $message,
        ], $status);
    }
}
