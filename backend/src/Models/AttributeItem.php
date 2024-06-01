<?php

namespace App\Models;

class AttributeItem {
    protected $id;
    protected $attributeId;
    protected $displayValue;
    protected $value;

    public function __construct($id, $attributeId, $displayValue, $value) {
        $this->id = $id;
        $this->attributeId = $attributeId;
        $this->displayValue = $displayValue;
        $this->value = $value;
    }
}