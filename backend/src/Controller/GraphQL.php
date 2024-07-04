<?php

namespace App\Controller;

use App\GraphQL\TypeRegistry;
use App\GraphQL\Types\AttributesItemType;
use App\GraphQL\Types\AttributeType;
use App\GraphQL\Types\CategoryType;
use App\GraphQL\Types\CurrencyType;
use App\GraphQL\Types\GalleryType;
use App\GraphQL\Types\OrderItemType;
use App\GraphQL\Types\OrderType;
use App\GraphQL\Types\PriceType;
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
            $typeRegistry = new TypeRegistry();

            // Register all necessary types
            $typeRegistry->register('ProductType', new ProductType());
            $typeRegistry->register('CategoryType', new CategoryType());
            $typeRegistry->register('AttributeType', new AttributeType());
            $typeRegistry->register('AttributesItemType', new AttributesItemType());
            $typeRegistry->register('GalleryType', new GalleryType());
            $typeRegistry->register('PriceType', new PriceType());
            $typeRegistry->register('CurrencyType', new CurrencyType());
            $typeRegistry->register('OrderType', new OrderType());
            $typeRegistry->register('OrderItemType', new OrderItemType());

            $productService = new ProductService(new ProductRepository());
            $categoryService = new CategoryService(new CategoryRepository());
            $attributeService = new AttributesService(new AttributesRepository());
            $attributeItemsService = new AttributesItemService(new AttributesItemRepository());
            $galleryService = new GalleryService(new GalleryRepository());
            $priceService = new PriceService(new PriceRepository());
            $currencyService = new CurrencyService(new CurrencyRepository());
            $orderService = new OrderService(new OrderRepository());
            $orderItemService = new OrderItemService(new OrderItemRepository());

            $services = [
                'productService' => $productService,
                'categoryService' => $categoryService,
                'attributeService' => $attributeService,
                'attributeItemsService' => $attributeItemsService,
                'galleryService' => $galleryService,
                'priceService' => $priceService,
                'currencyService' => $currencyService,
                'orderService' => $orderService,
                'orderItemService' => $orderItemService,
            ];

            $queryType = new QueryType($typeRegistry, $services);
            $mutationType = new MutationType($typeRegistry, $services);

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


            $result = \GraphQL\GraphQL::executeQuery($schema, $query, null, null, $variableValues);

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
