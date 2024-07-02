<?php

namespace App\Controller;

use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\OrderItemType;
use App\GraphQL\Types\OrderType;
use App\GraphQL\Types\ProductType;
use App\Repositories\AttributesItemRepository;
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
use App\Services\AttributesItemService;
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
            $attributeItemsService = new AttributesItemService(new AttributesItemRepository());
            $galleryService = new GalleryService(new GalleryRepository());
            $priceService = new PriceService(new PriceRepository());
            $currencyService = new CurrencyService(new CurrencyRepository());
            $orderService = new OrderService(new OrderRepository());
            $orderItemService = new OrderItemService(new OrderItemRepository());
            $productType = new ProductType();
            $orderType = new OrderType();
            $orderItemType = new OrderItemType();

            $queryType = new QueryType($productType, $productService, $categoryService, $attributeService, $attributeItemsService, $galleryService, $priceService, $currencyService);
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


            $input = json_decode($rawInput, true);

            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;


            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);

            $output = $result->toArray();
        } catch (Throwable $e) {
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
