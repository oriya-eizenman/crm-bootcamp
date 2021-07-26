<?php

require_once('controller.php');


class items extends controller
{

    public $model_cls = "items";
    public function __construct()
    {
        parent::__construct();
    }


    public function getItems()
    {
        $items = $this->model->getAllItems($this->jsonData["bakery_id"]);
        $this->response["items"] = $items;
        return $this->response;
    }

    public function deleteItem()
    {
        $items = $this->model->deleteItem($this->jsonData["bakery_id"], $this->jsonData["item"]["item_id"]);
        $this->response["items"] = $items;
        return $this->response;
    }

    public function createItem()
    {
        exit($this->jsonData["item"]->$_FILES["image"]);
        $items = $this->model->createItem($this->jsonData["bakery_id"], $this->jsonData["item"]);
        $this->response["items"] = $items;
        return $this->response;
    }

    public function updateItem()
    {
        $item = $this->model->updateItem(
            $this->jsonData["item"]
        );
        $this->response["item"] = $item;
        return $this->response;
    }
}
