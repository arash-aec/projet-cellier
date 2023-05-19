<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bouteille extends Model
{
    protected $table = 'vino__bouteille';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'image',
        'code_saq',
        'pays',
        'description',
        'prix_saq',
        'url_saq',
        'url_img',
        'format',
        'type',
        'date_achat',
        'garde_jusqua',
        'notes',
        'prix',
        'millesime',
    ];

    public function pays()
{
    return $this->belongsTo(Pays::class, 'pays');
}

public function type()
{
    return $this->belongsTo(Type::class, 'type');
}


}