<?php

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\AttributeType;
use App\GraphQL\Types\GalleryType;
use App\GraphQL\Types\PriceType;
use App\GraphQL\Types\CurrencyType;
use App\GraphQL\Types\ProductType;

class MutationType extends ObjectType {
    public function __construct($productService, $categoryService, $attributeService, $galleryService, $priceService, $currencyService) {
        $config = [
            'name' => 'Mutation',
            'fields' => [
                'createProduct' => [
                    'type' => new ProductType(),
                    'args' => [
                        'id' => Type::nonNull(Type::string()),
                        'name' => Type::nonNull(Type::string()),
                        'in_stock' => Type::nonNull(Type::boolean()),
                        'description' => Type::nonNull(Type::string()),
                        'category_id' => Type::nonNull(Type::int()),
                        'attributes_id' => Type::nonNull(Type::int()),
                        'gallery_id' => Type::nonNull(Type::int()),
                        'prices_id' => Type::nonNull(Type::int()),
                        'brand' => Type::nonNull(Type::string())
                    ],
                    'resolve' => function($root, $args) use ($productService) {
                        return $productService->createProduct($args);
                    }
                ],
                'updateProduct' => [
                    'type' => new ProductType(),
                    'args' => [
                        'id' => Type::nonNull(Type::string()),
                        'name' => Type::nonNull(Type::string()),
                        'in_stock' => Type::nonNull(Type::boolean()),
                        'description' => Type::string(),
                        'category_id' => Type::nonNull(Type::int()),
                        'brand' => Type::string()
                    ],
                    'resolve' => function($root, $args) use ($productService) {
                        return $productService->updateProduct($args['id'], $args);
                    }
                ],
                'deleteProduct' => [
                    'type' => Type::boolean(),
                    'args' => [
                        'id' => Type::nonNull(Type::string())
                    ],
                    'resolve' => function($root, $args) use ($productService) {
                        return $productService->deleteProduct($args['id']);
                    }
                ],
                // TO-DO: Add similar fields for creating, updating, and deleting Categories, Attributes, Gallery, Prices, and Currencies
            ]
        ];
        parent::__construct($config);
    }
}
