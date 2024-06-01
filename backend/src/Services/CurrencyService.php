<?php

namespace App\Services;

use App\Models\Currencies;
use App\Repositories\CurrencyRepository;

class CurrencyService {
    private $currencyRepository;

    public function __construct(CurrencyRepository $currencyRepository) {
        $this->currencyRepository = $currencyRepository;
    }

    public function getAllCurrencies() {
        return $this->currencyRepository->findAll();
    }

    public function getCurrencyById($id) {
        return $this->currencyRepository->findById($id);
    }

    public function createCurrency($data) {
        $currency = new Currencies(
            null,
            $data['label'],
            $data['symbol']
        );
        $this->currencyRepository->save($currency);
    }

    public function updateCurrency($id, $data) {
        $currency = new Currencies(
            $id,
            $data['label'],
            $data['symbol']
        );
        $this->currencyRepository->update($currency);
    }

    public function deleteCurrency($id) {
        $this->currencyRepository->delete($id);
    }
}