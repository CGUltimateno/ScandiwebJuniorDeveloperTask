<?php

namespace App\Models\Abstracts;

abstract class AbstractAttribute {
    protected $id;
    protected $productId;
    protected $name;
    protected $type;


    public function __construct($id, $productId, $name, $type) {
        $this->id = $id;
        $this->productId = $productId;
        $this->name = $name;
        $this->type = $type;
    }

    abstract public function getAttributeType(): string;
}