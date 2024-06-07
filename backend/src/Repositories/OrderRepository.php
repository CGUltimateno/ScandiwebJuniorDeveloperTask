<?php

namespace App\Repositories;

use App\config\Database;
use App\Models\Order;
use PDO;

class OrderRepository implements RepositoryInterface {
    private $db;

    public function __construct()
    {
        $this->db = (new Database())->getConnection();
    }

    public function findAll() {
        $stmt = $this->db->query('SELECT * FROM orders');
        return $stmt->fetchAll();
    }

    public function findById($id) {
        $stmt = $this->db->prepare('SELECT * FROM orders WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function save($entity) {
        $stmt = $this->db->prepare('INSERT INTO orders (total) VALUES (:total)');
        $stmt->execute(['total' => $entity->total]);
        $entity->id = $this->db->lastInsertId();
        return $entity;
    }

    public function update($entity) {
        $stmt = $this->db->prepare('UPDATE orders SET total = :total WHERE id = :id');
        $stmt->execute([
            'total' => $entity->total,
            'id' => $entity->id
        ]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare('DELETE FROM orders WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }
}
