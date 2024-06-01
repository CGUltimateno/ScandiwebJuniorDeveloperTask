<?php

namespace App\Models;

class Currencies {
    protected $id;
    protected $label;
    protected $symbol;

    public function __construct($id, $label, $symbol) {
        $this->id = $id;
        $this->label = $label;
        $this->symbol = $symbol;
    }
}