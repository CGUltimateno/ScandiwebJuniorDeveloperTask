<?php

namespace App\Models;

class Price {
    protected $id;
    protected $productId;
    protected $amount;

    protected $currency_id;

    public function __construct($id, $productId, $amount, $currency_id) {
        $this->id = $id;
        $this->productId = $productId;
        $this->amount = $amount;
        $this->currency_id = $currency_id;
    }
}