<?php
namespace App\GraphQL\Queries;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\AttributeType;
use App\GraphQL\Types\GalleryType;
use App\GraphQL\Types\PriceType;
use App\GraphQL\Types\CurrencyType;
use App\GraphQL\Types\ProductType;
use Throwable;

class QueryType extends ObjectType {
    public function __construct($productService, $categoryService, $attributeService, $galleryService, $priceService, $currencyService) {
        $productType = new ProductType();

        $config = [
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf($productType),
                    'resolve' => function() use ($productService) {
                        return $productService->getAllProducts();
                    }
                ],
                'product' => [
                    'type' => $productType,
                    'args' => [
                        'id' => Type::nonNull(Type::string()),
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
                'attributes' => [
                    'type' => Type::listOf(new AttributeType()),
                    'resolve' => function() use ($attributeService) {
                        return $attributeService->getAllAttributes();
                    }
                ],
                'galleries' => [
                    'type' => Type::listOf(new GalleryType()),
                    'resolve' => function() use ($galleryService) {
                        return $galleryService->getAllGalleryItems();
                    }
                ],
                'prices' => [
                    'type' => Type::listOf(new PriceType()),
                    'resolve' => function() use ($priceService) {
                        return $priceService->getAllPrices();
                    }
                ],
                'currencies' => [
                    'type' => Type::listOf(new CurrencyType()),
                    'resolve' => function() use ($currencyService) {
                        return $currencyService->getAllCurrencies();
                    }
                ],
            ]
        ];
        parent::__construct($config);
    }
}
