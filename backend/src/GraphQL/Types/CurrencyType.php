<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CurrencyType extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'Currency',
            'fields' => [
                'id' => Type::int(),
                'label' => Type::string(),
                'symbol' => Type::string()
            ]
        ];
        parent::__construct($config);
    }
}