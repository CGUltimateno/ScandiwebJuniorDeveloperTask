<?php
namespace App\GraphQL\Queries;

use App\GraphQL\Types\AttributesItemType;
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
    public function __construct($productType, $productService, $categoryService, $attributeService, $attributeItemsService, $galleryService, $priceService, $currencyService) {

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
                'attributesByProductId' => [
                    'type' => Type::listOf(new AttributeType()),
                    'args' => [
                        'productId' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => function($root, $args) use ($attributeService) {
                        return $attributeService->getAttributesbyProductId($args['productId']);
                    }
                ],
                'attributeItems' => [
                    'type' => Type::listOf(new AttributesItemType()),
                    'resolve' => function() use ($attributeItemsService) {
                        return $attributeItemsService->getAllAttributesItems();
                    }
                ],
                'attributeItemsByProductId' => [
                    'type' => Type::listOf(new AttributesItemType()),
                    'args' => [
                        'productId' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => function($root, $args) use ($attributeItemsService) {
                        return $attributeItemsService->getAttributesItemsbyProductId($args['productId']);
                    }
                ],
                'galleries' => [
                    'type' => Type::listOf(new GalleryType()),
                    'resolve' => function() use ($galleryService) {
                        return $galleryService->getAllGalleryItems();
                    }
                ],
                'galleriesByProductId' => [
                    'type' => Type::listOf(new GalleryType()),
                    'args' => [
                        'productId' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => function($root, $args) use ($galleryService) {
                        return $galleryService->getGalleryItemsByProductId($args['productId']);
                    }
                ],
                'prices' => [
                    'type' => Type::listOf(new PriceType()),
                    'resolve' => function() use ($priceService) {
                        return $priceService->getAllPrices();
                    }
                ],
                'pricesByProductId' => [
                    'type' => Type::listOf(new PriceType()),
                    'args' => [
                        'productId' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => function($root, $args) use ($priceService) {
                        return $priceService->getPricesByProductId($args['productId']);
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
