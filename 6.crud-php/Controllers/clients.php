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

    public function getClient()
    {
        $client = $this->model->getClient($this->jsonData["client_id"]);
        $this->response["client"] = $client;
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

    public function updateClient()
    {
        $client_id = $this->model->updateClient(
            $this->jsonData["client"]["client_id"],
            $this->jsonData["client"]["client_name"],
            $this->jsonData["client"]["client_email"],
            $this->jsonData["client"]["client_phone"],
            $this->jsonData["client"]["city"],
            $this->jsonData["client"]["street"],
            $this->jsonData["client"]["house_number"],
            $this->jsonData["client"]["apartment_number"]
        );
        $this->response["client_id"] = $client_id;
        return $this->response;
    }
}
