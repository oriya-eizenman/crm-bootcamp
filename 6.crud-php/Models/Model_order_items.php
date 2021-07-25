<?php

require_once("Model_crud.php");

class Model_order_items extends Model_crud
{
    public function __construct()
    {
        parent::__construct();
    }

    // public function getAllOrders()
    // {
    //     // $where = $this->parseWhere($values);
    //     $sql = "
    //         SELECT orders.*, bakery_user.user_name, clients.client_name FROM 
    //         orders INNER JOIN bakery_user
    //         ON orders.user_id = bakery_user.user_id
    //         INNER JOIN clients ON orders.client_id = clients.client_id
    //     ";

    //     return $this->getSpecialQuery($sql);
    // }

    public function getOrderItems($order_id)
    {
        $sql = "
            SELECT order_items.item_id, order_items.qty, items.item, items.price, order_items.qty * items.price AS total FROM 
            items INNER JOIN order_items
            ON items.item_id = order_items.item_id
            WHERE order_items.order_id=$order_id
        ";
        return $this->getSpecialQuery($sql);
    }

    public function deleteOrderItems($order_id)
    {
        $conditions = [
            "order_id" => $order_id
        ];
        return $this->delete("order_items", $conditions);
    }

    public function createOrderItems($bakery_id, $order_id, $items)
    {
        foreach ($items as $item) {
            $_fields = array();
            $conditions = [
                "bakery_id" => $bakery_id,
                "order_id" => $order_id,
                "item_id" => $item["item"]["item_id"],
                "qty" => $item["qty"]
            ];
            foreach ($conditions as $key => $val) {
                $_fields[$key]  = $val;
            }
            $sql = sprintf('INSERT INTO order_items (%s) VALUES ("%s")', implode(',', array_keys($_fields)), implode('","', array_values($_fields)));
            $this->getDB()
                ->query($sql);
        }
        return $this->getDB()->insert_id;
    }

    public function updateOrderItems(
        $bakery_id,
        $order_id,
        $items
    ) {
        $this->deleteOrderItems($order_id);


        foreach ($items as $item) {
            $_fields = array();
            $conditions = [
                "bakery_id" => $bakery_id,
                "order_id" => $order_id,
                "item_id" => $item["item_id"],
                "qty" => $item["qty"]
            ];
            foreach ($conditions as $key => $val) {
                $_fields[$key]  = $val;
            }
            $sql = sprintf('INSERT INTO order_items (%s) VALUES ("%s")', implode(',', array_keys($_fields)), implode('","', array_values($_fields)));
            $this->getDB()
                ->query($sql);
        }
        return $this->getDB()->insert_id;


        // $conditions = [
        //     "client_name" => $client_name,
        //     "client_phone" => $client_phone,
        //     "client_email" => $client_email,
        //     "city" => $city,
        //     "street" => $street,
        //     "house_number" => $house_number,
        //     "apartment_number" => $apartment_number
        // ];
        // return $this->update("clients", $conditions, "client_id", $client_id);
    }
}
