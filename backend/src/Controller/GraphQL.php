<?php

namespace App\Controller;

use App\GraphQL\Schemas\QueriesSchema;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\SchemaConfig;
use PDO;
use RuntimeException;
use Throwable;

class GraphQL extends ObjectType{

    private $categoryService;
    private $pdo;

    public function __construct(PDO $pdo){
        $this->pdo = $pdo;
    }
    static public function handle() {
        try {
            $schema = SchemaConfig::create()->setQuery(new QueriesSchema(($this->pdo));

            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get php://input');
            }

            $input = json_decode($rawInput, true);
            $query = $input['query'];
            $variableValues = $input['variables'] ?? null;

            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variableValues);
            $output = $result->toArray();
        } catch (Throwable $e) {
            $output = [
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ];
        }

        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($output);
    }
}