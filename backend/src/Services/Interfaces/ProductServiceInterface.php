<?php

namespace App\Services\Interfaces;

interface ProductServiceInterface {
    public function getAllProducts();
    public function getProductById($id);
    public function createProduct($data);
    public function updateProduct($id, $data);
    public function deleteProduct($id);
}