<?php
namespace App\GraphQL\Queries;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class QueryType extends ObjectType {
    public function __construct($typeRegistry, $services) {
        $config = [
            'name' => 'Query',
            'fields' => [
                'products' => [
                    'type' => Type::listOf($typeRegistry->get('ProductType')),
                    'resolve' => function() use ($services) {
                        return $services['productService']->getAllProducts();
                    }
                ],
                'product' => [
                    'type' => $typeRegistry->get('ProductType'),
                    'args' => [
                        'id' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => function($root, $args) use ($services) {
                        return $services['productService']->getProductById($args['id']);
                    }
                ],
                'categories' => [
                    'type' => Type::listOf($typeRegistry->get('CategoryType')),
                    'resolve' => function() use ($services) {
                        return $services['categoryService']->getAllCategories();
                    }
                ],
                'attributes' => [
                    'type' => Type::listOf($typeRegistry->get('AttributeType')),
                    'resolve' => function() use ($services) {
                        return $services['attributeService']->getAllAttributes();
                    }
                ],
                'attributesByProductId' => [
                    'type' => Type::listOf($typeRegistry->get('AttributeType')),
                    'args' => [
                        'productId' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => function($root, $args) use ($services) {
                        return $services['attributeService']->getAttributesByProductId($args['productId']);
                    }
                ],
                'attributeItems' => [
                    'type' => Type::listOf($typeRegistry->get('AttributesItemType')),
                    'resolve' => function() use ($services) {
                        return $services['attributeItemsService']->getAllAttributesItems();
                    }
                ],
                'attributeItemsByProductId' => [
                    'type' => Type::listOf($typeRegistry->get('AttributesItemType')),
                    'args' => [
                        'productId' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => function($root, $args) use ($services) {
                        return $services['attributeItemsService']->getAttributesItemsByProductId($args['productId']);
                    }
                ],
                'galleries' => [
                    'type' => Type::listOf($typeRegistry->get('GalleryType')),
                    'resolve' => function() use ($services) {
                        return $services['galleryService']->getAllGalleryItems();
                    }
                ],
                'galleriesByProductId' => [
                    'type' => Type::listOf($typeRegistry->get('GalleryType')),
                    'args' => [
                        'productId' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => function($root, $args) use ($services) {
                        return $services['galleryService']->getGalleryItemsByProductId($args['productId']);
                    }
                ],
                'prices' => [
                    'type' => Type::listOf($typeRegistry->get('PriceType')),
                    'resolve' => function() use ($services) {
                        return $services['priceService']->getAllPrices();
                    }
                ],
                'pricesByProductId' => [
                    'type' => Type::listOf($typeRegistry->get('PriceType')),
                    'args' => [
                        'productId' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => function($root, $args) use ($services) {
                        return $services['priceService']->getPricesByProductId($args['productId']);
                    }
                ],
                'currencies' => [
                    'type' => Type::listOf($typeRegistry->get('CurrencyType')),
                    'resolve' => function() use ($services) {
                        return $services['currencyService']->getAllCurrencies();
                    }
                ],
            ]
        ];
        parent::__construct($config);
    }
}