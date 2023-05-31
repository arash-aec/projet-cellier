<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Type;
use App\Models\Pays;
use App\Models\CellierBouteilles;
use App\Models\ListeAchat;


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

    public function listeAchats()
    {
        return $this->hasMany(ListeAchat::class, 'bouteille_id');
    }
}