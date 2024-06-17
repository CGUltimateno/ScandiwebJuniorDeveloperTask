<?php

namespace App\Repositories;

use App\config\Database;
use App\Repositories\RepositoryInterface;
use App\Models\Attributes;
class AttributesRepository implements RepositoryInterface
{
    private $db;

    public function __construct()
    {
        $this->db = (new Database())->getConnection();
    }

    public function findAll() {
        $stmt = $this->db->query("SELECT * FROM attributes");
        return $stmt->fetchAll();
    }

    public function findById($id) {
        $stmt = $this->db->prepare("SELECT * FROM attributes WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function save($attribute) {
        $stmt = $this->db->prepare("INSERT INTO attributes (product_id, name, type) VALUES (:product_id, :name, :type)");
        $stmt->execute([
            'product_id' => $attribute->productId,
            'name' => $attribute->name,
            'type' => $attribute->type,
            ]);
    }

    public function update($attribute) {
        $stmt = $this->db->prepare("UPDATE attributes SET product_id = :product_id, name = :name, type = :type WHERE id = :id");
        $stmt->execute([
            'id' => $attribute->id,
            'product_id' => $attribute->productId,
            'name' => $attribute->name,
            'type' => $attribute->type,
        ]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM attributes WHERE id = :id");
        $stmt->execute(['id' => $id]);
    }

    public function findByProductId($productId)
    {
        $stmt = $this->db->prepare("SELECT * FROM attributes WHERE product_id = :product_id");
        $stmt->execute(['product_id' => $productId]);
        return $stmt->fetchAll();
    }
}