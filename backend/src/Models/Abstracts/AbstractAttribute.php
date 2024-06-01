<?php

namespace App\Models\Abstracts;

abstract class AbstractAttribute {
    protected $id;
    protected $productId;
    protected $name;
    protected $type;
    protected $attributeItemId;


    public function __construct($id, $productId, $name, $type, $attributeItemId) {
        $this->id = $id;
        $this->productId = $productId;
        $this->name = $name;
        $this->type = $type;
        $this->attributeItemId = $attributeItemId;
    }

    abstract public function getAttributeType(): string;
}