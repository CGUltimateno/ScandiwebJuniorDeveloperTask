<?php

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeType extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'Attribute',
            'fields' => [
                'id' => Type::int(),
                'name' => Type::string(),
                'type' => Type::string(),
                'product_id' => Type::string(),
                'attribute_item_id' => Type::int()
            ]
        ];
        parent::__construct($config);
    }
}