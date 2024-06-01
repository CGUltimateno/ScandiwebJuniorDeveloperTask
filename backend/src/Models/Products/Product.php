<?php

namespace App\Models;
use App\Models\Abstracts\AbstractProduct;

class Product extends AbstractProduct {
    public function __construct($id, $name, $inStock, $description, $categoryId, $attributesId, $galleryId, $pricesId, $brand) {
        parent::__construct($id, $name, $inStock, $description, $categoryId, $attributesId, $pricesId, $galleryId, $brand);
    }

    public function getProductType(): string {
        return 'simple';
    }
}
