<?php

namespace App\Models;

use App\Models\Abstracts\AbstractCategory;

class Category extends AbstractCategory {
    public function __construct($id, $name) {
        parent::__construct($id, $name);
    }

    public function getCategoryType(): string {
        return 'default';
    }
}