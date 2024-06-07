<?php

namespace App\Repositories;

use App\config\Database;
use App\Models\OrderItem;
use PDO;

class OrderItemRepository implements RepositoryInterface {
    private $db;

    public function __construct()
    {
        $this->db = (new Database())->getConnection();
    }
    public function findAll() {
        $stmt = $this->db->query('SELECT * FROM order_items');
        return $stmt->fetchAll();
    }

    public function findById($id) {
        $stmt = $this->db->prepare('SELECT * FROM order_items WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function save($entity) {
        $stmt = $this->db->prepare('INSERT INTO order_items (order_id, product_id, quantity) VALUES (:order_id, :product_id, :quantity)');
        $stmt->execute([
            'order_id' => $entity->order_id,
            'product_id' => $entity->product_id,
            'quantity' => $entity->quantity
        ]);
        $entity->id = $this->db->lastInsertId();
        return $entity;
    }

    public function update($entity) {
        $stmt = $this->db->prepare('UPDATE order_items SET order_id = :order_id, product_id = :product_id, quantity = :quantity WHERE id = :id');
        $stmt->execute([
            'order_id' => $entity->order_id,
            'product_id' => $entity->product_id,
            'quantity' => $entity->quantity,
            'id' => $entity->id
        ]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare('DELETE FROM order_items WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }
}
