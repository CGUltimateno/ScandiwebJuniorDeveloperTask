<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemType extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'OrderItem',
            'fields' => [
                'id' => Type::int(),
                'order_id' => Type::int(),
                'product_id' => Type::string(),
                'attribute_id' => Type::string(),
                'attribute_item_id' => Type::string(),
                'quantity' => Type::int()
            ]
        ];
        parent::__construct($config);
    }
}
