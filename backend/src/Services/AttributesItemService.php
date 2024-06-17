<?php

namespace App\Services;

use App\Models\Attributes\AttributeItem;
use App\Repositories\AttributesItemRepository;
use App\config\Database;
class AttributesItemService
{
    private AttributesItemRepository $attributesItemRepository;

    public function __construct(AttributesItemRepository $attributesItemRepository) {
        $this->attributesItemRepository = $attributesItemRepository;
    }

    public function getAllAttributesItems() {
        return $this->attributesItemRepository->findAll();
    }

    public function getAttributesItemById($id) {
        return $this->attributesItemRepository->findById($id);
    }

    public function getAttributesItemsbyProductId($productId) {
        return $this->attributesItemRepository->findByProductId($productId);
    }

    public function createAttributesItem($data) {
        $attributesItem = new AttributeItem(
            null,
            $data['attribute_id'],
            $data['product_id'],
            $data['displayValue'],
            $data['value']
        );
        $this->attributesItemRepository->save($attributesItem);
    }

    public function updateAttributesItem($id, $data) {
        $attributesItem = new AttributeItem(
            $id,
            $data['attribute_id'],
            $data['product_id'],
            $data['displayValue'],
            $data['value']
        );
        $this->attributesItemRepository->update($attributesItem);
    }

    public function deleteAttributesItem($id) {
        $this->attributesItemRepository->delete($id);
    }
}