<?php

namespace App\Models\Abstracts;

abstract class AbstractCategory {
    protected $id;
    protected $name;

    public function __construct($id, $name) {
        $this->id = $id;
        $this->name = $name;
    }

    abstract public function getCategoryType(): string;
}