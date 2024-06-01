<?php

namespace App\Services;

use App\Models\AttributeItem;
use App\Repositories\AttributeItemRepository;
use App\config\Database;
class AttributesItemService
{
    private $attributesItemRepository;

    public function __construct(AttributeItemRepository $attributesItemRepository) {
        $this->attributesItemRepository = $attributesItemRepository;
    }

    public function getAllAttributesItems() {
        return $this->attributesItemRepository->findAll();
    }

    public function getAttributesItemById($id) {
        return $this->attributesItemRepository->findById($id);
    }

    public function createAttributesItem($data) {
        $attributesItem = new AttributeItem(
            null,
            $data['attribute_id'],
            $data['displayValue'],
            $data['value']
        );
        $this->attributesItemRepository->save($attributesItem);
    }

    public function updateAttributesItem($id, $data) {
        $attributesItem = new AttributeItem(
            $id,
            $data['attribute_id'],
            $data['displayValue'],
            $data['value']
        );
        $this->attributesItemRepository->update($attributesItem);
    }

    public function deleteAttributesItem($id) {
        $this->attributesItemRepository->delete($id);
    }
}