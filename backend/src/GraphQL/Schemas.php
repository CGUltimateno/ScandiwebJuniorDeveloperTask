<?php

namespace App\GraphQL;

use App\GraphQL\Schemas\CategoriesSchema;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;
use GraphQL\Type\Definition\ObjectType;

class Schemas {

    private static $CategoriesSchema;

    public static function category() {
        return self::$CategoriesSchema ?: (self::$CategoriesSchema = new CategoriesSchema());
    }
}
