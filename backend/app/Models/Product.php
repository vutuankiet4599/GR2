<?php

namespace App\Models;

use Elasticquent\ElasticquentTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    use ElasticquentTrait;

    protected $fillable = ['name', 'address', 'quantity', 'description', 'user_id'];

    public function getIndexName()
    {
        return 'products';
    }

    protected $mappingProperties = [
        'id' => [
            'type' => 'keyword',
        ],
        'name' => [
            'type' => 'text',
            'analyzer' => 'standard',
        ],
        'address' => [
            'type' => 'text',
            'analyzer' => 'standard',
        ],
        'quantity' => [
            'type' => 'numeric',
            'analyzer' => 'standard',
        ],
        'description' => [
            'type' => 'text',
            'analyzer' => 'standard',
        ],
        'user_id' => [
            'type' => 'keyword',
        ],
        'created_at' => [
            'type' => 'date',
            'analyzer' => 'standard',
        ],
        'updated_at' => [
            'type' => 'date',
            'analyzer' => 'standard',
        ],
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function media()
    {
        return $this->hasMany(Media::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
