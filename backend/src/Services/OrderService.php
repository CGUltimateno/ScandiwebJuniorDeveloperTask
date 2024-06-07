<?php

namespace App\Services;

use App\Repositories\OrderRepository;

class OrderService {
    private $orderRepository;

    public function __construct(OrderRepository $orderRepository) {
        $this->orderRepository = $orderRepository;
    }

    public function getAllOrders() {
        return $this->orderRepository->findAll();
    }

    public function getOrderById($id) {
        return $this->orderRepository->findById($id);
    }

    public function createOrder($order) {
        return $this->orderRepository->save($order);
    }

    public function updateOrder($order) {
        return $this->orderRepository->update($order);
    }

    public function deleteOrder($id) {
        return $this->orderRepository->delete($id);
    }
}
