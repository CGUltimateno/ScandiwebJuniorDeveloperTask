<?php

namespace App\Services;

use App\Models\Category;
use App\Repositories\CategoryRepository;
use App\Services\Interfaces\CategoryServiceInterface;

class CategoryService implements CategoryServiceInterface {
    private CategoryRepository $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository) {
        $this->categoryRepository = $categoryRepository;
    }

    public function getAllCategories() {
        return $this->categoryRepository->findAll();
    }

    public function getCategoryById($id) {
        return $this->categoryRepository->findById($id);
    }

    public function createCategory($data) {
        $category = new Category(
            null,
            $data['name']
        );
        $this->categoryRepository->save($category);
    }

    public function updateCategory($id, $data) {
        $category = new Category(
            $id,
            $data['name']
        );
        $this->categoryRepository->update($category);
    }

    public function deleteCategory($id) {
        $this->categoryRepository->delete($id);
    }
}