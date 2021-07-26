<?php

require_once('controller.php');


class data extends controller
{

    public $model_cls = "data";
    public function __construct()
    {
        parent::__construct();
    }


    public function getIncomes()
    {
        $incomes = $this->model->getIncomes($this->jsonData["bakery_id"]);
        $this->response["incomes"] = $incomes;
        return $this->response;
    }

    public function getEmployeesPerformance()
    {
        $performance = $this->model->getEmployeesPerformance($this->jsonData["bakery_id"]);
        $this->response["performance"] = $performance;
        return $this->response;
    }

    public function getEmployeesOrders()
    {
        $employeesOrders = $this->model->getEmployeesOrders($this->jsonData["bakery_id"]);
        $this->response["employeesOrders"] = $employeesOrders;
        return $this->response;
    }

    public function getItemsSells()
    {
        $itemsSells = $this->model->getItemsSells($this->jsonData["bakery_id"]);
        $this->response["itemsSells"] = $itemsSells;
        return $this->response;
    }

    public function getTotalRevenue()
    {
        $totalRevenue = $this->model->getTotalRevenue($this->jsonData["bakery_id"]);
        $this->response["totalRevenue"] = $totalRevenue;
        return $this->response;
    }

    public function getTotalOrders()
    {
        $totalOrders = $this->model->getTotalOrders($this->jsonData["bakery_id"]);
        $this->response["totalOrders"] = $totalOrders;
        return $this->response;
    }

    public function getTotalClients()
    {
        $totalClients = $this->model->getTotalClients($this->jsonData["bakery_id"]);
        $this->response["totalClients"] = $totalClients;
        return $this->response;
    }
}
