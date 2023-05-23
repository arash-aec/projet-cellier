<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Usager;
use App\Models\CellierBouteilles;

class Cellier extends Model
{
    use HasFactory;
    
    protected $table = 'vino__cellier';

    protected $primaryKey = 'id';

    public $incrementing = true;

    protected $fillable = [
        'nom',
        'usager_id',
    ];

    protected $casts = [
        'nom' => 'string',
        'usager_id' => 'integer',
    ];

    public function bouteilles()
    {
        return $this->hasMany(CellierBouteilles::class, 'cellier_id')->with('bouteille');
    }

    // Relation 1:N le cellier peux appartenir a un usager
    public function usager()
    {
        return $this->belongsTo(Usager::class, 'usager_id', 'id');
    }
}
/*
    // A mettre dans usager pour lier les deux : 
    use App\Models\Cellier;

    // Relation N:M L
    public function celliers()
    {
        return $this->hasMany(Cellier::class, 'usager_id', 'id');
    }

    // Pour accéder ensuite a un cellier d'un usager 
    $usager = Usager::find(1);
    celliers = $usager->celliers;
*/


