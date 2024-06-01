<?php

use \App\Controller\CategoriesController;
use App\Controller\GraphQL;

return [
    '/getCategories' => [CategoriesController::class, 'getCategories'],
    '/graphql' => [GraphQL::class, 'handle'],
];