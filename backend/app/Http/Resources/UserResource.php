<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

// To get pagination data: UserResource::collection(User::paginate)->response()->getData()
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'name' => $this->name,
            'avatar' => $this->avatar,
            'role' => new RoleResource($this->whenLoaded('role')),
            'products' => ProductResource::collection($this->whenLoaded('products')),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
            'orders' => OrderResource::collection($this->whenLoaded('orders')),
            'userRequests' => UserRequestResource::collection($this->whenLoaded('userRequests')),
        ];
    }
}
