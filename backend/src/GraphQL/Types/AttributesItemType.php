<?php

namespace App\GraphQL\Types;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class AttributesItemType extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'AttributesItem',
            'fields' => [
                'id' => Type::string(),
                'attribute_id' => Type::string(),
                'product_id' => Type::string(),
                'display_value' => Type::string(),
                'value' => Type::string()
            ]
        ];
        parent::__construct($config);
    }
}