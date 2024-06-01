<?php

namespace App\Models;

class Price {
    protected $id;
    protected $productId;
    protected $amount;
    protected $currencyId;

    public function __construct($id, $productId, $amount, $currencyId) {
        $this->id = $id;
        $this->productId = $productId;
        $this->amount = $amount;
        $this->currencyId = $currencyId;
    }
}