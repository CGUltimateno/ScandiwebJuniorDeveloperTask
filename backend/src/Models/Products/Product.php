<?php

namespace App\Models\Products;
use App\Models\Abstracts\AbstractProduct;

class Product extends AbstractProduct {
    public function __construct($id, $name, $inStock, $description, $categoryId, $brand) {
        parent::__construct($id, $name, $inStock, $description, $categoryId, $brand);
    }

    public function getProductType(): string {
        return 'simple';
    }

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getInStock() {
        return $this->inStock;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getCategoryId() {
        return $this->categoryId;
    }

    public function getBrand() {
        return $this->brand;
    }
}