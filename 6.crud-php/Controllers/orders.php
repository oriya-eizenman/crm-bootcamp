<?php

require_once('controller.php');


class orders extends controller
{

    public $model_cls = "orders";
    public function __construct()
    {
        parent::__construct();
    }


    public function getOrders()
    {
        $orders = $this->model->getAllOrders($this->jsonData["bakery_id"]);
        $this->response["orders"] = $orders;
        return $this->response;
    }

    public function getOrdersByPage()
    {
        $orders = $this->model->getAllOrders($this->jsonData["bakery_id"]);
        $page = $this->jsonData["page"];
        $per_page = $this->jsonData["per_page"];
        $this->response["orders"] = array_slice($orders, ($page - 1) * $per_page, $per_page);
        return $this->response;
    }

    public function deleteOrder()
    {
        $orders = $this->model->deleteOrder($this->jsonData["bakery_id"], $this->jsonData["order_id"]);
        $this->response["orders"] = $orders;
        return $this->response;
    }

    public function createOrder()
    {
        $order_id = $this->model->createOrder(
            $this->jsonData["client_id"],
            $this->jsonData["user_id"],
            $this->jsonData["bakery_id"],
            $this->jsonData["total"],
            $this->jsonData["delivery_date"]
        );
        $this->response["order_id"] = $order_id;
        return $this->response;
    }

    public function updateOrder()
    {
        $order_id = $this->model->updateOrderTotal(
            $this->jsonData["order_id"],
            $this->jsonData["total"]
        );
        $this->response["order_id"] = $order_id;
        return $this->response;
    }

    public function getAddresses()
    {
        $addresses = $this->model->getAddresses(
            $this->jsonData["bakery_id"]
        );
        $this->response["addresses"] = $addresses;
        return $this->response;
    }

    public function updateOrderStatus()
    {
        $order_id = $this->model->updateOrderStatus(
            $this->jsonData["order_id"],
            $this->jsonData["status"]
        );
        $this->response["order_id"] = $order_id;
        return $this->response;
    }
}
