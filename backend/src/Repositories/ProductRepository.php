<?php

namespace App\Repositories;

use App\config\Database;
use App\Models\Products\Product;
use App\Repositories\RepositoryInterface;

class ProductRepository implements RepositoryInterface {
    private $db;

    public function __construct() {
            $this->db = (new Database())->getConnection();
        }

    public function findAll() {
            $stmt = $this->db->query("SELECT * FROM products");
            $results = $stmt->fetchAll();
            return $results;
    }

    public function findById($id) {
        $stmt = $this->db->prepare("SELECT * FROM products WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function save($entity) {
        $entity = new Product($entity['id'], $entity['name'], $entity['in_stock'], $entity['description'], $entity['category_id'], $entity['brand']);
        try {
            $stmt = $this->db->prepare(
                "INSERT INTO products (id, name, in_stock, description, category_id, brand)
            VALUES (:id, :name, :in_stock, :description, :category_id, :brand)"
            );
            $stmt->execute([
                'id' => $entity->getId(),
                'name' => $entity->getName(),
                'in_stock' => $entity->getInStock(),
                'description' => $entity->getDescription(),
                'category_id' => $entity->getCategoryId(),
                'brand' => $entity->getBrand()
            ]);
        } catch (\PDOException $e) {
            error_log("Database error: " . $e->getMessage(), 3, 'C:\Users\moham\Desktop\error.log');
            throw new \RuntimeException('Database error: ' . $e->getMessage());
        }
    }

    public function update($product) {
        $stmt = $this->db->prepare("UPDATE products SET name = :name, in_stock = :in_stock, description = :description, category_id = :category_id, brand = :brand WHERE id = :id");
        $stmt->execute([
            'id' => $product->id,
            'name' => $product->name,
            'in_stock' => $product->inStock,
            'description' => $product->description,
            'category_id' => $product->categoryId,
            'brand' => $product->brand
        ]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM products WHERE id = :id");
        $stmt->execute(['id' => $id]);
    }
}
