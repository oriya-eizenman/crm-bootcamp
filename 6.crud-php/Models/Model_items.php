<?php

require_once("Model_crud.php");

class Model_items extends Model_crud
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllItems($bakery_id)
    {
        $conditions = [
            "bakery_id" => $bakery_id
        ];
        return $this->getAll("items", $conditions);
    }

    public function deleteItem($bakery_id, $item)
    {
        var_dump($bakery_id);
        var_dump($item);
        $conditions = [
            "bakery_id" => $bakery_id,
            "item" => $item
        ];
        return $this->delete("items", $conditions);
    }
}
