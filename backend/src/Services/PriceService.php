<?php

namespace App\Services;

use App\Models\Price;
use App\Repositories\PriceRepository;

class PriceService {
    private PriceRepository $priceRepository;

    public function __construct(PriceRepository $priceRepository) {
        $this->priceRepository = $priceRepository;
    }

    public function getAllPrices() {
        return $this->priceRepository->findAll();
    }

    public function getPriceById($id) {
        return $this->priceRepository->findById($id);
    }

    public function getPricesByProductId($productId)
    {
        return $this->priceRepository->findByProductId($productId);
    }

    public function createPrice($data) {
        $price = new Price(
            null,
            $data['product_id'],
            $data['amount'],
            $data['currency_id']
        );
        $this->priceRepository->save($price);
    }

    public function updatePrice($id, $data) {
        $price = new Price(
            $id,
            $data['product_id'],
            $data['amount'],
            $data['currency_id']
        );
        $this->priceRepository->update($price);
    }

    public function deletePrice($id) {
        $this->priceRepository->delete($id);
    }
}