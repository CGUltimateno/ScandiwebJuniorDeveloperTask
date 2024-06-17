<?php

namespace App\Repositories;

use App\Repositories\RepositoryInterface;
use App\config\Database;
use App\Models\Gallery;

class GalleryRepository implements RepositoryInterface
{
    private $db;

    public function __construct()
    {
        $this->db = (new Database())->getConnection();
    }

    public function findAll()
    {
        $stmt = $this->db->query("SELECT * FROM gallery");
        return $stmt->fetchAll();
    }

    public function findById($id)
    {
        $stmt = $this->db->prepare("SELECT * FROM gallery WHERE id = :id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function save($gallery)
    {
        $stmt = $this->db->prepare("INSERT INTO gallery (product_id, image_url) VALUES (:product_id, :image_url)");
        $stmt->execute([
            'product_id' => $gallery->productId,
            'image_url' => $gallery->imageUrl
        ]);
    }

    public function update($gallery)
    {
        $stmt = $this->db->prepare("UPDATE gallery SET product_id = :product_id, image_url = :image_url WHERE id = :id");
        $stmt->execute([
            'id' => $gallery->id,
            'product_id' => $gallery->productId,
            'image_url' => $gallery->imageUrl
        ]);
    }

    public function delete($id)
    {
        $stmt = $this->db->prepare("DELETE FROM gallery WHERE id = :id");
        $stmt->execute(['id' => $id]);
    }

    public function findByProductId($productId)
    {
        $stmt = $this->db->prepare("SELECT * FROM gallery WHERE product_id = :product_id");
        $stmt->execute(['product_id' => $productId]);
        return $stmt->fetchAll();
    }
}