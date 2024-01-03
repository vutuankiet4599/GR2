<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'name' => $this->name,
            'address' => $this->address,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'avgRating' => $this->reviews_avg_ratings,
            'reviewsCount' => $this->reviews_count,
            'user' => new UserResource($this->whenLoaded('user')),
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'media' => MediaResource::collection($this->whenLoaded('media')),
            'orders' => OrderResource::collection($this->whenLoaded('orders')),
            'reviews' => ReviewResource::collection($this->whenLoaded('reviews')),
        ];
    }
}
