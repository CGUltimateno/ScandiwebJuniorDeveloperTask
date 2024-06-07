<?php

namespace App\Controller;

use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\OrderItemType;
use App\GraphQL\Types\OrderType;
use App\GraphQL\Types\ProductType;
use App\Repositories\AttributesRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\CurrencyRepository;
use App\Repositories\GalleryRepository;
use App\Repositories\OrderItemRepository;
use App\Repositories\OrderRepository;
use App\Repositories\PriceRepository;
use App\Repositories\ProductRepository;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\Type;
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
use App\Services\OrderService;
use App\Services\OrderItemService;
use RuntimeException;
use Throwable;

class GraphQL {
    static public function handle() {
        try {
            $productService = new ProductService(new ProductRepository());
            $categoryService = new CategoryService(new CategoryRepository());
            $attributeService = new AttributesService(new AttributesRepository());
            $galleryService = new GalleryService(new GalleryRepository());
            $priceService = new PriceService(new PriceRepository());
            $currencyService = new CurrencyService(new CurrencyRepository());
            $orderService = new OrderService(new OrderRepository());
            $orderItemService = new OrderItemService(new OrderItemRepository());
            $productType = new ProductType();
            $orderType = new OrderType();
            $orderItemType = new OrderItemType();

            $queryType = new QueryType($productType, $orderType, $orderItemType, $productService, $categoryService, $attributeService, $galleryService, $priceService, $currencyService, $orderService, $orderItemService);
            $mutationType = new MutationType($orderService, $orderItemService, $orderType, $orderItemType);

            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($queryType)
                    ->setMutation($mutationType)
            );

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            error_log("Raw input: " . $rawInput, 3, 'C:\Users\moham\Desktop\error.log');

            $input = json_decode($rawInput, true);
            error_log("Decoded input: " . print_r($input, true), 3, 'C:\Users\moham\Desktop\error.log');

            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;

            error_log("Query: " . $query, 3, 'C:\Users\moham\Desktop\error.log');
            error_log("Variable values: " . print_r($variableValues, true), 3, 'C:\Users\moham\Desktop\error.log');

            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);
            error_log("Execution result: " . print_r($result, true), 3, 'C:\Users\moham\Desktop\error.log');

            $output = $result->toArray();
        } catch (Throwable $e) {
            error_log('GraphQL Error: ' . $e->getMessage(), 3, 'C:\Users\moham\Desktop\error.log');
            error_log('Stack trace: ' . $e->getTraceAsString(), 3, 'C:\Users\moham\Desktop\error.log');
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($output);
    }
}
