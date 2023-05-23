<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Type;
use App\Models\Pays;
use App\Models\CellierBouteilles;


class Bouteille extends Model
{
    use HasFactory;
    
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

    public function relationPays()
    {
        return $this->belongsTo(Pays::class, 'pays');
    }

    public function relationType()
    {
        return $this->belongsTo(Type::class, 'type');
    }

    public function celliers()
    {
        return $this->hasMany(CellierBouteilles::class, 'bouteille_id')->with('cellier');
    }
}