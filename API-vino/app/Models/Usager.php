<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;



class Usager extends Model implements Authenticatable
{
    
    use \Illuminate\Auth\Authenticatable;

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
    public function role()
    {
        return $this->belongsTo(Role::class, 'role');
    }


   

    // Implement Authenticatable methods
    public function getAuthIdentifierName()
    {
        return 'id';
    }

    public function getAuthIdentifier()
    {
        return $this->getAttribute('courriel');
    }

    public function getAuthPassword()
    {
        return $this->getAttribute('mot_de_passe');
    }

    public function getRememberToken()
    {
        // Not needed if you don't have "remember me" functionality
    }

    public function setRememberToken($value)
    {
        // Not needed if you don't have "remember me" functionality
    }

    public function getRememberTokenName()
    {
        // Not needed if you don't have "remember me" functionality
    }

}
