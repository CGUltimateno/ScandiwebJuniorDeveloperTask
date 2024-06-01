<?php

namespace App\Controller;


use GraphQL\Type\Definition\ObjectType;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use App\GraphQL\Queries\QueryType;
use App\GraphQL\Mutations\MutationType;
use App\Services\ProductService;
use App\Services\CategoryService;
use App\Services\AttributesService;
use App\Services\GalleryService;
use App\Services\PriceService;
use App\Services\CurrencyService;
use RuntimeException;
use Throwable;

class GraphQL {
    static public function handle() {
        try {
            $productService = new ProductService(new \App\Repositories\ProductRepository());
            $categoryService = new CategoryService(new \App\Repositories\CategoryRepository());
            $attributeService = new AttributesService(new \App\Repositories\AttributesRepository());
            $galleryService = new GalleryService(new \App\Repositories\GalleryRepository());
            $priceService = new PriceService(new \App\Repositories\PriceRepository());
            $currencyService = new CurrencyService(new \App\Repositories\CurrencyRepository());

            $queryType = new QueryType($productService, $categoryService, $attributeService, $galleryService, $priceService, $currencyService);
            $mutationType = new MutationType($productService, $categoryService, $attributeService, $galleryService, $priceService, $currencyService);

            $schema = new Schema(
                (new SchemaConfig())
                ->setQuery($queryType)
                ->setMutation($mutationType)
            );

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;

            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);
            $output = $result->toArray();
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($output);
    }
}
