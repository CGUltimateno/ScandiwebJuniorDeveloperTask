<?php
namespace App\GraphQL;

use GraphQL\Type\Definition\Type;

class TypeRegistry {
    private $types = [];

    public function register($name, Type $type) {
        if (!isset($this->types[$name])) {
            $this->types[$name] = $type;
        }
    }

    public function get($name) {
        if (!isset($this->types[$name])) {
            throw new \Exception("Type {$name} is not registered in the type registry.");
        }
        return $this->types[$name];
    }
}
