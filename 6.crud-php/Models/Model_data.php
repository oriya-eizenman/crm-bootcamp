<?php

require_once("Model_crud.php");

class Model_data extends Model_crud
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getIncomes($bakery_id)
    {
        $sql = "
        select month(created) as Month, sum(total) as Sum
        FROM orders
        WHERE bakery_id=$bakery_id
        GROUP BY Month
        ";

        return $this->getSpecialQuery($sql);
    }

    public function getEmployeesPerformance($bakery_id)
    {
        $sql = "
        select sum(total) as sum, bakery_user.user_name as employee 
        FROM orders INNER JOIN bakery_user
        WHERE orders.user_id=bakery_user.user_id AND orders.bakery_id=$bakery_id
        GROUP BY employee
        ";

        return $this->getSpecialQuery($sql);
    }

    public function getEmployeesOrders($bakery_id)
    {
        $sql = "
        select count(order_id) as number_of_orders, bakery_user.user_name as employee 
        FROM orders INNER JOIN bakery_user
        WHERE orders.user_id=bakery_user.user_id AND orders.bakery_id=$bakery_id
        GROUP BY employee
        ";

        return $this->getSpecialQuery($sql);
    }

    public function getItemsSells($bakery_id)
    {
        $sql = "
        select items.item as item, sum(qty) as count
        FROM items INNER JOIN order_items
        ON items.item_id=order_items.item_id AND items.bakery_id=$bakery_id
        GROUP BY item
        ";

        return $this->getSpecialQuery($sql);
    }

    public function getTotalRevenue($bakery_id)
    {
        $sql = "
        select items.item as item, sum(qty) as count
        FROM items INNER JOIN order_items
        ON items.item_id=order_items.item_id AND items.bakery_id=$bakery_id
        GROUP BY item
        ";

        return $this->getSpecialQuery($sql);
    }

    public function getTotalOrders($bakery_id)
    {
        $sql = "
        select count(order_id) as num_of_orders
        from orders
        where bakery_id=$bakery_id
        ";

        return $this->getSpecialQuery($sql);
    }

    public function getTotalClients($bakery_id)
    {
        $sql = "
        select count(client_id) as num_of_clients
        from clients
        where bakery_id=$bakery_id
        ";

        return $this->getSpecialQuery($sql);
    }
}
