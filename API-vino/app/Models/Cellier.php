<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Usager;

class Cellier extends Model
{
    // Define the table name
    protected $table = 'vino__cellier';

    // Define the primary key column name
    protected $primaryKey = 'id';

    // Define if the primary key is auto-incrementing
    public $incrementing = true;

    // Define the column names that can be mass assigned
    protected $fillable = [
        'nom',
    ];

    // Define the column types
    protected $casts = [
        'nom' => 'string',
    ];

    // Relation 1:N le cellier peux appartenir cas un usager
    public function usager()
    {
        return $this->belongsTo(Usager::class, 'usager_id', 'id');
    }

/*
    // A mettre dans usager pour lier les deux : 
    use App\Models\Cellier;
    public function celliers()
    {
        return $this->hasMany(Cellier::class, 'usager_id', 'id');
    }

    // Pour accéder ensuite a un cellier d'un usager 
    $usager = Usager::find(1);
    celliers = $usager->celliers;
*/

}
