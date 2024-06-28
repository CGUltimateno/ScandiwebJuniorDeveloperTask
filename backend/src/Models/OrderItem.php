<?php

namespace App\Models;

class OrderItem {
    public $id;
    public $order_id;
    public $product_id;
    public $attribute_id;
    public $attribute_item_id;
    public $quantity;

    public function __construct($id, $order_id, $product_id, $attribute_id, $attribute_item_id, $quantity) {
        $this->id = $id;
        $this->order_id = $order_id;
        $this->product_id = $product_id;
        $this->attribute_id = $attribute_id;
        $this->attribute_item_id = $attribute_item_id;
        $this->quantity = $quantity;
    }
}