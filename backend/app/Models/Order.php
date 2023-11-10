<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'user_id', 'quantity', 'message'];

    public function product()
    {
        $this->belongsTo(Product::class);
    }

    public function user()
    {
        $this->belongsTo(User::class);
    }
}