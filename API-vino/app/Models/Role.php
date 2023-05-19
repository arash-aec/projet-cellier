<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'vino__role';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'role',
    ];
}
