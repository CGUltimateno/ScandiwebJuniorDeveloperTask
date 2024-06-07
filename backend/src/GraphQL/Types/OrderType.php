<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderType extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'Order',
            'fields' => [
                'id' => Type::int(),
                'total' => Type::float(),
                'created_at' => Type::string(),
                'updated_at' => Type::string()
            ]
        ];
        parent::__construct($config);
    }
}
