<?php

namespace App\Models;

use App\Models\Scopes\ProductWithAverageRatingScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use JeroenG\Explorer\Application\Explored;

class Product extends Model implements Explored
{
    use Searchable;
    use HasFactory;

    protected $fillable = ['name', 'address', 'quantity', 'description', 'user_id'];

    public function searchableAs(): string
    {
        return 'products';
    }

    public function mappableAs(): array
    {
        return [
            'id' => 'keyword',
            'name' => 'text',
            'quantity' => 'integer',
            'description' => 'text',
            'address' => 'text',
        ];
    }

    protected static function booted()
    {
        static::addGlobalScope(new ProductWithAverageRatingScope());
    }

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
