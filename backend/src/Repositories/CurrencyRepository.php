<?php

namespace App\Repositories;

use App\Repositories\RepositoryInterface;
use App\Models\Currencies;
use App\config\Database;
class CurrencyRepository implements RepositoryInterface {
    private $db;

    public function __construct() {
        $this->db = (new Database())->getConnection();
    }

    public function findAll() {
        $stmt = $this->db->query("SELECT * FROM currencies");
        return $stmt->fetchAll();
    }

    public function findById($id) {
        $stmt = $this->db->prepare("SELECT * FROM currencies WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function save($currency) {
        $stmt = $this->db->prepare("INSERT INTO currencies (label, symbol) VALUES (:label, :symbol)");
        $stmt->execute([
            'label' => $currency->label,
            'symbol' => $currency->symbol
        ]);
    }

    public function update($currency) {
        $stmt = $this->db->prepare("UPDATE currencies SET label = :label, symbol = :symbol WHERE id = :id");
        $stmt->execute([
            'id' => $currency->id,
            'label' => $currency->label,
            'symbol' => $currency->symbol
        ]);
    }

    public function delete($id) {
        $stmt = $this->db->prepare("DELETE FROM currencies WHERE id = :id");
        $stmt->execute(['id' => $id]);
    }
}