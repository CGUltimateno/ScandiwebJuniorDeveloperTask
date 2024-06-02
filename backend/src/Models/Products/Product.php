<?php

namespace App\Models\Products;
use App\Models\Abstracts\AbstractProduct;

class Product extends AbstractProduct {
    public function __construct($id, $name, $inStock, $description, $categoryId, $pricesId, $brand) {
        parent::__construct($id, $name, $inStock, $description, $categoryId, $pricesId, $brand);
    }

    public function getProductType(): string {
        return 'simple';
    }
}
