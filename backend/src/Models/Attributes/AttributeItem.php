<?php

namespace App\Models\Attributes;

class AttributeItem {
    protected $id;
    protected $attributeId;
    protected $product_id;
    protected $displayValue;
    protected $value;

    public function __construct($id, $attributeId, $product_id, $displayValue, $value) {
        $this->id = $id;
        $this->attributeId = $attributeId;
        $this->product_id = $product_id;
        $this->displayValue = $displayValue;
        $this->value = $value;
    }
}