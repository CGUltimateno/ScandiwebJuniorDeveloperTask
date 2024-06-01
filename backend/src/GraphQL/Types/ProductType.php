<?php

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductType extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'Product',
            'fields' => [
                'id' => Type::string(),
                'name' => Type::string(),
                'in_stock' => Type::boolean(),
                'description' => Type::string(),
                'category_id' => Type::int(),
                'attributes_id' => Type::int(),
                'gallery_id' => Type::int(),
                'prices_id' => Type::int(),
                'brand' => Type::string()
            ]
        ];
        parent::__construct($config);
    }
}