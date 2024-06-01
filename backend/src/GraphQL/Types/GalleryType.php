<?php

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class GalleryType extends ObjectType {
    public function __construct() {
        $config = [
            'name' => 'Gallery',
            'fields' => [
                'id' => Type::int(),
                'product_id' => Type::string(),
                'image_url' => Type::string()
            ]
        ];
        parent::__construct($config);
    }
}