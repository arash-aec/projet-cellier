<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    protected $table = 'vino__type';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'type',
    ];

    public function bouteilles()
    {
        return $this->hasMany(Bouteille::class, 'type');
    }
}