<?php

namespace App\Services;

use App\Models\Attributes;
use App\Repositories\AttributesRepository;
use App\Services\Interfaces\AttributeServiceInterface;

class AttributesService implements AttributeServiceInterface {
    private AttributesRepository $attributeRepository;

    public function __construct(AttributesRepository $attributeRepository) {
        $this->attributeRepository = $attributeRepository;
    }

    public function getAllAttributes() {
        return $this->attributeRepository->findAll();
    }

    public function getAttributeById($id) {
        return $this->attributeRepository->findById($id);
    }

    public function createAttribute($data) {
        $attribute = new Attributes(
            null,
            $data['product_id'],
            $data['name'],
            $data['type'],
        );
        $this->attributeRepository->save($attribute);
    }

    public function updateAttribute($id, $data) {
        $attribute = new Attributes(
            $id,
            $data['product_id'],
            $data['name'],
            $data['type'],
        );
        $this->attributeRepository->update($attribute);
    }

    public function deleteAttribute($id) {
        $this->attributeRepository->delete($id);
    }
}