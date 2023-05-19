<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class VinoBouteille extends Model
{
    // Define the table name
    protected $table = 'vino__bouteille';

    // Define the primary key column name
    protected $primaryKey = 'idPrimaire';

    // Define if the primary key is auto-incrementing
    public $incrementing = true;

    // Define the column names that can be mass assigned
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

    protected $casts = [
        'pays' => 'integer',
        'prix_saq' => 'float',
        'type' => 'integer',
    ];

}

