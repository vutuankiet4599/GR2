<?php

namespace App\Http\Controllers;

use App\Repositories\Model\User\UserRepository;
use Exception;
use Illuminate\Support\Facades\Auth;
use Twilio\Rest\Client;

class TestController extends Controller
{
    protected $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function index()
    {
        try {
            $client = new Client(env('TWILIO_ACCOUNT_SID'), env('TWILIO_AUTH_TOKEN'));

            $mess = $client->messages->create("+84348080406", [
                'from' => env('TWILIO_PHONE_NUMBER'),
                'body' => "Hello world",
            ]);

            return response()->json([
                'data' => $mess,
                'user' => Auth::user(),
            ]);
            
        } catch (\Exception $th) {
            throw $th;
        }
    }
}
