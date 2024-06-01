<?php

namespace App\Services\Interfaces;

interface AttributeServiceInterface {
    public function getAllAttributes();
    public function getAttributeById($id);
    public function createAttribute($data);
    public function updateAttribute($id, $data);
    public function deleteAttribute($id);
}