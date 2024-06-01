<?php

namespace App\Controller;
use App\repository\CategoriesRepository;
class CategoriesController
{
    private $categoriesRepository;

    public function __construct(CategoriesRepository $categoriesRepository)
    {
        $this->categoriesRepository = $categoriesRepository;
    }

    public function getCategories()
    {
        header('Content-Type: application/json');
        $categories = $this->categoriesRepository->getAll();
        if ($categories){
            echo json_encode($categories);
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Server issue']);
        }
    }
}