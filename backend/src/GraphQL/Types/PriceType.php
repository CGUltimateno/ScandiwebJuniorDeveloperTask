<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PriceType extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'Price',
            'fields' => [
                'id' => Type::int(),
                'product_id' => Type::string(),
                'amount' => Type::float(),
                'currency_id' => Type::int()
            ]
        ];
        parent::__construct($config);
    }
}