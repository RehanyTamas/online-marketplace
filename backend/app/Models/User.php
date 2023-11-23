<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $guarded = [];

    protected $hidden = ['password'];

    public function soldTransactions()
    {
        return $this->hasMany(Transaction::class, 'id_seller');
    }

    public function purchasedTransactions()
    {
        return $this->hasMany(Transaction::class, 'id_buyer');
    }

    public function items()
    {
        return $this->hasMany(Items::class, 'id_user');
    }
}
