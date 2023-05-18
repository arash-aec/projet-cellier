<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;





class ListeCellier extends Model
{
    protected $table = 'vino__cellier';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'id_bouteille',
        'date_achat',
        'garde_jusqua',
        'notes',
        'prix',
        'quantite',
        'millesime',
        'usager_id',
    ];

    public function usager()
    {
        return $this->belongsTo(Usager::class);
    }
}
