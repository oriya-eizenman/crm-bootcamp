<?php

require_once('controller.php');


class clients extends controller
{

    public $model_cls = "clients";
    public function __construct()
    {
        parent::__construct();
    }


    public function getClients()
    {
        $clients = $this->model->getAllClients($this->jsonData["bakery_id"]);
        $this->response["clients"] = $clients;
        return $this->response;
    }

    public function deleteClient()
    {
        $clients = $this->model->deleteClient($this->jsonData["client_email"]);
        $this->response["clients"] = $clients;
        return $this->response;
    }

    public function createClient()
    {
        $client_id = $this->model->createClient(
            $this->jsonData["bakery_id"],
            $this->jsonData["client_name"],
            $this->jsonData["client_email"],
            $this->jsonData["client_phone"],
            $this->jsonData["city"],
            $this->jsonData["street"],
            $this->jsonData["house_number"],
            $this->jsonData["apartment_number"]
        );
        $this->response["client_id"] = $client_id;
        return $this->response;
    }
}
