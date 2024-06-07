<?php

namespace App\Services;

use App\Repositories\OrderItemRepository;

class OrderItemService {
    private OrderItemRepository $orderItemRepository;

    public function __construct(OrderItemRepository $orderItemRepository) {
        $this->orderItemRepository = $orderItemRepository;
    }

    public function getAllOrderItems() {
        return $this->orderItemRepository->findAll();
    }

    public function getOrderItemById($id) {
        return $this->orderItemRepository->findById($id);
    }

    public function createOrderItem($orderItem) {
        return $this->orderItemRepository->save($orderItem);
    }

    public function updateOrderItem($orderItem) {
        return $this->orderItemRepository->update($orderItem);
    }

    public function deleteOrderItem($id) {
        return $this->orderItemRepository->delete($id);
    }
}
