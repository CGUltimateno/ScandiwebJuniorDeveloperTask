<?php
namespace App\Models\Attributes;

use App\Models\Abstracts\AbstractAttribute;

class Attributes extends AbstractAttribute {
    public function __construct($id, $productId, $name, $type) {
        parent::__construct($id, $productId, $name, $type);
    }

    public function getAttributeType(): string {
        return $this->type;
    }
}

