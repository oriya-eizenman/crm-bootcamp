<?php

require_once('controller.php');


class order_items extends controller
{

    public $model_cls = "order_items";
    public function __construct()
    {
        parent::__construct();
    }


    public function getOrderItems($order_id)
    {
        $order = $this->model->getOrderItems($this->jsonData["order_id"]);
        $this->response["order"] = $order;
        return $this->response;
    }

    // public function deleteOrder()
    // {
    //     $orders = $this->model->deleteOrder($this->jsonData["bakery_id"], $this->jsonData["order_id"]);
    //     $this->response["orders"] = $orders;
    //     return $this->response;
    // }

    public function createOrderItems()
    {
        $order_items = $this->model->createOrderItems(
            $this->jsonData["bakery_id"],
            $this->jsonData["order_id"],
            $this->jsonData["items"]
        );
        $this->response["order_items"] = $order_items;
        return $this->response;
    }

    public function updateOrderItems()
    {
        $order_items = $this->model->updateOrderItems(
            $this->jsonData["bakery_id"],
            $this->jsonData["order_id"],
            $this->jsonData["items"]
        );
        $this->response["order_items"] = $order_items;
        return $this->response;
    }
}
