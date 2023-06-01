<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Cellier;

class CellierTest extends TestCase
{
    public function testGetCelliers()
    {
        $response = $this->get('/api/celliers');

        $response->assertStatus(200);
    }

    public function testGetCellier()
    {
        $cellierId = 1;
        $response = $this->get('/api/cellier/' . $cellierId);

        $response->assertStatus(200);
    }

    public function testAjoutCellier()
{
    $data = [
        'nom' => 'Nouveau Cellier',
        'usager_id' => 1, // Replace 1 with the appropriate usager_id value
    ];

    $response = $this->post('/api/cellier', $data);

    $response->assertStatus(201);
}

public function testModifierCellier()
{
    $cellierId = 1; // Replace 1 with the appropriate cellier ID

    $data = [
        'nom' => 'Nouveau Nom du Cellier',
        'usager_id' => 1, // Replace 1 with the appropriate usager_id value
    ];

    $response = $this->put('/api/cellier/' . $cellierId, $data);

    $response->assertStatus(200);
}

public function testEffacerCellier()
{
    $cellierId = 1; // Replace 1 with the appropriate cellier ID

    $response = $this->delete('/api/cellier/' . $cellierId);

    $response->assertStatus(200);
}

}
