<?php

namespace App\GraphQL\Schemas;

use App\GraphQL\Schemas;
use App\repository\GraphqlCategoriesService;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class QueriesSchema extends ObjectType
{
    public function __construct($pdo){
        $categoryService = new GraphqlCategoriesService($pdo);
        $config = [
            'name' => 'Query',
            'fields' => [
                'categories' => [
                    'type' => Type::listOf(Schemas::category()),
                    'resolve' => function() use ($categoryService) {
                        return $categoryService->getCategories();
                    },
                ],
            ],
        ];
        parent::__construct($config);
    }
}