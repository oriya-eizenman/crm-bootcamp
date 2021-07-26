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

    public function deleteItem($bakery_id, $item_id)
    {
        $conditions = [
            "bakery_id" => $bakery_id,
            "item_id" => $item_id
        ];
        return $this->delete("items", $conditions);
    }

    public function createItem($bakery_id, $item)
    {
        $conditions = [
            "bakery_id" => $bakery_id,
            "item" => $item["item"],
            "description" => $item["description"],
            "price" => $item["price"],
            "cost" => $item["cost"],
            "category" => $item["category"]
        ];
        return $this->insert("items", $conditions);
    }

    public function updateItem($item)
    {
        $conditions = [
            "item" => $item["item"],
            "description" => $item["description"],
            "price" => $item["price"],
            "cost" => $item["cost"],
            "category" => $item["category"]
        ];
        return $this->update("items", $conditions, "item_id", $item["item_id"]);
    }
}
