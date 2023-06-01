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
            'description' => 'Description du nouveau cellier',
            // Include other required fields as per your implementation
        ];

        $response = $this->post('/api/cellier', $data);

        $response->assertStatus(201);
    }

    public function testModifierCellier()
    {
        $cellierId = 1;
        $data = [
            'nom' => 'Cellier modifié',
            // Include other fields you want to modify
        ];

        $response = $this->put('/api/cellier/' . $cellierId, $data);

        $response->assertStatus(200);
    }

    public function testEffacerCellier()
    {
        $cellierId = 1;

        $response = $this->delete('/api/cellier/' . $cellierId);

        $response->assertStatus(200);
    }
}
