<?php

namespace App\Models;

class Gallery {
    protected $id;
    protected $productId;
    protected $imageUrl;

    public function __construct($id, $productId, $imageUrl) {
        $this->id = $id;
        $this->productId = $productId;
        $this->imageUrl = $imageUrl;
    }
}