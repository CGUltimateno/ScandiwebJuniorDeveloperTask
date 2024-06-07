<?php

namespace App\Models;

class Order
{
    public $id;
    public $total;
    public $created_at;
    public $updated_at;

    public function __construct($id, $total, $created_at, $updated_at) {
        $this->id = $id;
        $this->total = $total;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }
}