<?php

namespace App\GraphQL\Mutations;

use App\Models\Order;
use App\Models\OrderItem;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\GraphQL\Types\OrderType;
use App\GraphQL\Types\OrderItemType;
use App\Services\OrderService;
use App\Services\OrderItemService;

class MutationType extends ObjectType {
    public function __construct(OrderService $orderService, OrderItemService $orderItemService, OrderType $orderType, OrderItemType $orderItemType) {
        $config = [
            'name' => 'Mutation',
            'fields' => [
                'createOrderWithItems' => [
                    'type' => $orderType,
                    'args' => [
                        'total' => Type::nonNull(Type::float()),
                    ],
                    'resolve' => function($root, $args) use ($orderService) {
                        $order = new Order(null, $args['total'], null, null);
                        return $orderService->createOrder($order);
                    }
                ],
                'createOrderItem' => [
                    'type' => $orderItemType,
                    'args' => [
                        'order_id' => Type::nonNull(Type::int()),
                        'product_id' => Type::nonNull(Type::string()),
                        'quantity' => Type::nonNull(Type::int()),
                    ],
                    'resolve' => function($root, $args) use ($orderItemService) {
                        $orderItem = new OrderItem(null, $args['order_id'], $args['product_id'], $args['quantity'], $args['attribute_id'], $args['attribute_item_id']);
                        return $orderItemService->createOrderItem($orderItem);
                    }
                ],
            ]
        ];
        parent::__construct($config);
    }
}
