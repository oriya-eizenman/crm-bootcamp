<?php

require_once("Model_crud.php");

class Model_orders extends Model_crud
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllOrders()
    {
        // $where = $this->parseWhere($values);
        $sql = "
            SELECT orders.*, bakery_user.user_name, clients.client_name FROM 
            orders INNER JOIN bakery_user
            ON orders.user_id = bakery_user.user_id
            INNER JOIN clients ON orders.client_id = clients.client_id
        ";

        return $this->getSpecialQuery($sql);
    }

    // public function getAllOrders($bakery_id)
    // {
    //     $conditions = [
    //         "bakery_id" => $bakery_id
    //     ];
    //     return $this->getAll("orders", $conditions);
    // }

    public function deleteOrder($bakery_id, $order_id)
    {
        $conditions = [
            "bakery_id" => $bakery_id,
            "order_id" => $order_id
        ];
        return $this->delete("orders", $conditions);
    }

    public function createOrder($client_id, $user_id, $bakery_id, $total)
    {
        $conditions = [
            "client_id" => $client_id,
            "user_id" => $user_id,
            "bakery_id" => $bakery_id,
            "total" => $total
        ];
        return $this->insert("orders", $conditions);
    }

    public function updateOrder($order_id, $total)
    {
        $conditions = [
            "total" => $total
        ];
        return $this->update("orders", $conditions, "order_id", $order_id);
    }

    public function getAddresses()
    {
        // $where = $this->parseWhere($values);
        $sql = "
        select DISTINCT CONCAT(clients.street,' ',clients.house_number, ', ', clients.city) AS address FROM
        clients INNER JOIN orders 
        ON clients.client_id = orders.client_id
        ";

        return $this->getSpecialQuery($sql);
    }
}
