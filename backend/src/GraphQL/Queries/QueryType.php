<?php
namespace App\GraphQL\Queries;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\ProductType;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\AttributeType;
use App\GraphQL\Types\GalleryType;
use App\GraphQL\Types\PriceType;
use App\GraphQL\Types\CurrencyType;

class QueryType extends ObjectType {
    public function __construct($productService, $categoryService, $attributeService, $galleryService, $priceService, $currencyService) {
        $config = [
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf(new ProductType()),
                    'resolve' => function() use ($productService) {
                        return $productService->getAllProducts();
                    }
                ],
                'product' => [
                    'type' => new ProductType(),
                    'args' => [
                        'id' => Type::nonNull(Type::string())
                    ],
                    'resolve' => function($root, $args) use ($productService) {
                        return $productService->getProductById($args['id']);
                    }
                ],
                'categories' => [
                    'type' => Type::listOf(new CategoryType()),
                    'resolve' => function() use ($categoryService) {
                        return $categoryService->getAllCategories();
                    }
                ],
                'category' => [
                    'type' => new CategoryType(),
                    'args' => [
                        'id' => Type::nonNull(Type::int())
                    ],
                    'resolve' => function($root, $args) use ($categoryService) {
                        return $categoryService->getCategoryById($args['id']);
                    }
                ],
                // TO-DO: Add similar fields for Attributes, Gallery, Prices, and Currencies
            ]
        ];
        parent::__construct($config);
    }
}
