<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Bouteille;
use App\Models\Cellier;


class CellierBouteilles extends Model
{
    use HasFactory;

    protected $table = 'vino__cellier_bouteilles';
    protected $primaryKey = null;
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'cellier_id',
        'bouteille_id',
        'quantite',
    ];

    protected $casts = [
        'cellier_id'    => 'integer',
        'bouteille_id'  => 'integer',
        'quantite'      => 'integer',
    ];

    protected $keyType = 'int';


    public function cellier()
    {
        return $this->belongsTo(Cellier::class, 'cellier_id');
    }

    public function bouteille()
    {
        return $this->belongsTo(Bouteille::class, 'bouteille_id');
    }

    protected function setKeysForSaveQuery($query)
    {
        $query
            ->where('cellier_id', '=', $this->getAttribute('cellier_id'))
            ->where('bouteille_id', '=', $this->getAttribute('bouteille_id'));
        return $query;
    }
}
