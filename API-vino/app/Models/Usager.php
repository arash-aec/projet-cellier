<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;




class Usager extends Model
{
    protected $table = 'vino__usager';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'prenom',
        'courriel',
        'mot_de_passe',
        'role',
    ];


}
