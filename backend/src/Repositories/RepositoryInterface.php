<?php

namespace App\Repositories;

interface RepositoryInterface {
    public function findAll();
    public function findById($id);
    public function save($entity);
    public function update($entity);
    public function delete($id);
}