<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Bouteille;
use App\Models\Usager;

class ListeAchat extends Model
{
    protected $table = 'vino__liste_achat';
    public $timestamps = false;

    protected $primaryKey = ['usager_id', 'bouteille_id'];
    public $incrementing = false;

    protected $fillable = [
        'usager_id',
        'bouteille_id',
        'quantite',
    ];

    public function usager()
    {
        return $this->belongsTo(Usager::class, 'usager_id');
    }

    public function bouteille()
    {
        return $this->belongsTo(Bouteille::class, 'bouteille_id');
    }

}
