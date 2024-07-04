<?php

namespace App\GraphQL\Mutations;

use App\Models\Order;
use App\Models\OrderItem;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class MutationType extends ObjectType {
    public function __construct($typeRegistry, $services) {
        $config = [
            'name' => 'Mutation',
            'fields' => [
                'createOrderWithItems' => [
                    'type' => $typeRegistry->get('OrderType'),
                    'args' => [
                        'total' => Type::nonNull(Type::float()),
                    ],
                    'resolve' => function($root, $args) use ($services) {
                        $order = new Order(null, $args['total'], null, null);
                        return $services['orderService']->createOrder($order);
                    }
                ],
                'createOrderItem' => [
                    'type' => $typeRegistry->get('OrderItemType'),
                    'args' => [
                        'order_id' => Type::nonNull(Type::int()),
                        'product_id' => Type::nonNull(Type::string()),
                        'attribute_id' => Type::string(),
                        'attribute_item_id' => Type::string(),
                        'quantity' => Type::nonNull(Type::int()),
                    ],
                    'resolve' => function($root, $args) use ($services) {
                        $orderItem = new OrderItem(
                            null,
                            $args['order_id'],
                            $args['product_id'],
                            $args['attribute_id'] ?? null,
                            $args['attribute_item_id'] ?? null,
                            $args['quantity']
                        );
                        return $services['orderItemService']->createOrderItem($orderItem);
                    }
                ],
            ]
        ];
        parent::__construct($config);
    }
}
