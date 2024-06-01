<?php
require __DIR__ . '/../vendor/autoload.php';

use App\config\Database;
use App\GraphQL\Types\MutationType;
use App\GraphQL\Types\QueryType;
use GraphQL\GraphQL;
use GraphQL\Type\Schema;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$database = new Database();
$db = $database->getConnection();

$schema = new Schema([
    'query' => new QueryType(),
    'mutation' => new MutationType()
]);

$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);
$query = $input['query'];
$variableValues = isset($input['variables']) ? $input['variables'] : null;

try {
    $result = GraphQL::executeQuery($schema, $query, null, null, $variableValues);
    $output = $result->toArray();
} catch (\Exception $e) {
    $output = [
        'errors' => [
            [
                'message' => $e->getMessage()
            ]
        ]
    ];
}

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);