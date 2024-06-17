<?php

namespace App\Services;

use App\Models\Gallery;
use App\Repositories\GalleryRepository;

class GalleryService {
    private GalleryRepository $galleryRepository;

    public function __construct(GalleryRepository $galleryRepository) {
        $this->galleryRepository = $galleryRepository;
    }

    public function getAllGalleryItems() {
        return $this->galleryRepository->findAll();
    }

    public function getGalleryItemById($id) {
        return $this->galleryRepository->findById($id);
    }

    public function getGalleryItemsByProductId($productId) {
        return $this->galleryRepository->findByProductId($productId);
    }

    public function createGalleryItem($data) {
        $gallery = new Gallery(
            null,
            $data['product_id'],
            $data['image_url']
        );
        $this->galleryRepository->save($gallery);
    }

    public function updateGalleryItem($id, $data) {
        $gallery = new Gallery(
            $id,
            $data['product_id'],
            $data['image_url']
        );
        $this->galleryRepository->update($gallery);
    }

    public function deleteGalleryItem($id) {
        $this->galleryRepository->delete($id);
    }
}