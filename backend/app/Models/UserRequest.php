<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRequest extends Model
{
    use HasFactory;

    protected $fillable = ['message', 'type', 'status', 'expired', 'user_id']; 

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
