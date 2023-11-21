<?php

namespace App\Http\Controllers;

use App\Events\MessageChatEvent;
use App\Http\Resources\UserResource;
use App\Models\Message;
use App\Models\Role;
use App\Models\User;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    use ResponseTrait;

    public function chat(Request $request)
    {
        $fromUser = $request->user();
        $toUser = User::find($request->input('to'));
        Message::create(['from' => $fromUser->id, 'to' => $toUser->id, 'message' => $request->input('message')]);
        event(new MessageChatEvent($fromUser, $toUser, $request->input('message')));
        return $this->success([], "success");
    }

    public function getAllUsersToChat(Request $request, $id)
    {
        $superAdmin = Role::where('name', '=', "SUPER_ADMIN")->first();
        $users = User::where('id', '!=', $id)->where('role_id', '!=', $superAdmin['id'])->get();
        return $this->success(UserResource::collection($users));
    }

    public function getAllMessagesOfTwoUsers(Request $request, $firstUser, $secondUser)
    {
        $data = Message::where(function ($query) use ($firstUser, $secondUser) {
            $query->where('from', $firstUser)
                  ->where('to', $secondUser);
        })->orWhere(function ($query) use ($firstUser, $secondUser) {
            $query->where('from', $secondUser)
                  ->where('to', $firstUser);
        })->get();

        return $this->success($data, "Successfully");
    }
}
