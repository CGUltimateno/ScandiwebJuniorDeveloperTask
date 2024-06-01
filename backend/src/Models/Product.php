<?php

namespace App\Models;
use App\Models\Abstracts\AbstractProduct;

class Product extends AbstractProduct {
    public function __construct($id, $name, $inStock, $description, $categoryId, $brand) {
        parent::__construct($id, $name, $inStock, $description, $categoryId, $brand);
    }

    public function getProductType(): string {
        return 'simple';
    }
}
