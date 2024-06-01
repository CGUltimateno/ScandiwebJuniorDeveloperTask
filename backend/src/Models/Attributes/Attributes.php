<?php
namespace App\Models;

use App\Models\Abstracts\AbstractAttribute;

class Attributes extends AbstractAttribute {
    public function __construct($id, $productId, $name, $type, $attributeItemId) {
        parent::__construct($id, $productId, $name, $type, $attributeItemId);
    }

    public function getAttributeType(): string {
        return $this->type;
    }
}

