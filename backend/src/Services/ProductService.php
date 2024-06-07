<?php

namespace App\Services;

use App\Models\Products\Product;
use App\Repositories\ProductRepository;
use App\Services\Interfaces\ProductServiceInterface;

class ProductService implements ProductServiceInterface {
    private ProductRepository $productRepository;

    public function __construct(ProductRepository $productRepository) {
        $this->productRepository = $productRepository;
    }

    public function getAllProducts() {
        return $this->productRepository->findAll();
    }

    public function getProductById($id) {
        return $this->productRepository->findById($id);
    }

    public function createProduct($data) {
        $product = new Product(
            $data['id'],
            $data['name'],
            $data['in_stock'],
            $data['description'],
            $data['category_id'],
            $data['brand']
        );
        $this->productRepository->save($product);
        return $product;
    }

    public function updateProduct($id, $data) {
        $product = new Product(
            $id,
            $data['name'],
            $data['in_stock'],
            $data['description'],
            $data['category_id'],
            $data['brand']
        );
        $this->productRepository->update($product);
    }

    public function deleteProduct($id) {
        $this->productRepository->delete($id);
    }
}