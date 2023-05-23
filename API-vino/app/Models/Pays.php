<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Bouteille;

class Pays extends Model
{
    protected $table = 'vino__pays';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'pays',
    ];

    public function bouteilles()
    {
        return $this->hasMany(Bouteille::class, 'pays');
    }
}
