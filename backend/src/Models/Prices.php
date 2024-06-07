<?php

namespace App\Models;

class Price {
    protected $id;
    protected $productId;
    protected $amount;

    public function __construct($id, $productId, $amount) {
        $this->id = $id;
        $this->productId = $productId;
        $this->amount = $amount;
    }
}