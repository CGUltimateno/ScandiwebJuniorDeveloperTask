<?php

namespace App\Models\Abstracts;

abstract class AbstractProduct {
    protected $id;
    protected $name;
    protected $inStock;
    protected $description;
    protected $categoryId;
    protected $pricesId;
    protected $brand;

    public function __construct($id, $name, $inStock, $description, $categoryId, $pricesId, $brand) {
        $this->id = $id;
        $this->name = $name;
        $this->inStock = $inStock;
        $this->description = $description;
        $this->categoryId = $categoryId;
        $this->pricesId = $pricesId;
        $this->brand = $brand;
    }

    abstract public function getProductType(): string;
}
