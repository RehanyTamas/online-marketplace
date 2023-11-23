<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'price',
        'id_seller',
        'id_buyer'
    ];

    public function item()
    {
        return $this->belongsTo(Items::class);
    }

    public function seller()
    {
        return $this->belongsTo(User::class, 'id_seller');
    }

    public function buyer()
    {
        return $this->belongsTo(User::class, 'id_buyer');
    }
}
