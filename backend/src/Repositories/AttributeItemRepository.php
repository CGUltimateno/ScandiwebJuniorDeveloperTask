<?php

namespace App\Repositories;

use App\config\Database;
use App\Repositories\RepositoryInterface;
use App\Models\AttributeItem;

class AttributeItemRepository implements RepositoryInterface
{
    private $db;

    public function __construct() {
        $this->db = (new Database())->getConnection();
    }

    public function findAll() {
        $stmt = $this->db->query("SELECT * FROM attribute_items");
        return $stmt->fetchAll();
    }

    public function findById($id) {
        $stmt = $this->db->prepare("SELECT * FROM attribute_items WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function save($attributeItem) {
        $stmt = $this->db->prepare("INSERT INTO attribute_items (attribute_id, display_value, value) VALUES (:attribute_id, :display_value, :value)");
        $stmt->execute([
            'attribute_id' => $attributeItem->attributeId,
            'display_value' => $attributeItem->displayValue,
            'value' => $attributeItem->value
        ]);
    }

    public function update($attributeItem) {
        $stmt = $this->db->prepare("UPDATE attribute_items SET attribute_id = :attribute_id, display_value = :display_value, value = :value WHERE id = :id");
        $stmt->execute([
            'id' => $attributeItem->id,
            'attribute_id' => $attributeItem->attributeId,
            'display_value' => $attributeItem->displayValue,
            'value' => $attributeItem->value
        ]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM attribute_items WHERE id = :id");
        $stmt->execute(['id' => $id]);
    }
}