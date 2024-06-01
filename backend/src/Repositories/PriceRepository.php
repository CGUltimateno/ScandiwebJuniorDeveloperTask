<?php

namespace App\Repositories;

use App\config\Database;
use App\Models\Price;


class PriceRepository implements RepositoryInterface {
    private $db;

    public function __construct() {
        $this->db = (new Database())->getConnection();
    }

    public function findAll() {
        $stmt = $this->db->query("SELECT * FROM prices");
        return $stmt->fetchAll();
    }

    public function findById($id) {
        $stmt = $this->db->prepare("SELECT * FROM prices WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function save($price) {
        $stmt = $this->db->prepare("INSERT INTO prices (product_id, amount, currency_id) VALUES (:product_id, :amount, :currency_id)");
        $stmt->execute([
            'product_id' => $price->productId,
            'amount' => $price->amount,
            'currency_id' => $price->currencyId
        ]);
    }

    public function update($price) {
        $stmt = $this->db->prepare("UPDATE prices SET product_id = :product_id, amount = :amount, currency_id = :currency_id WHERE id = :id");
        $stmt->execute([
            'id' => $price->id,
            'product_id' => $price->productId,
            'amount' => $price->amount,
            'currency_id' => $price->currencyId
        ]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM prices WHERE id = :id");
        $stmt->execute(['id' => $id]);
    }
}