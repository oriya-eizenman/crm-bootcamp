<?php

require_once("Model_crud.php");

class Model_clients extends Model_crud
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllClients($bakery_id)
    {
        $conditions = [
            "bakery_id" => $bakery_id
        ];
        return $this->getAll("clients", $conditions);
    }

    public function deleteClient($client_email)
    {
        $conditions = [
            "client_email" => $client_email
        ];
        return $this->delete("clients", $conditions);
    }

    public function createClient(
        $bakery_id,
        $client_name,
        $client_phone,
        $client_email,
        $city,
        $street,
        $house_number,
        $apartment_number
    ) {
        $conditions = [
            "bakery_id" => $bakery_id,
            "client_name" => $client_name,
            "client_phone" => $client_phone,
            "client_email" => $client_email,
            "city" => $city,
            "street" => $street,
            "house_number" => $house_number,
            "apartment_number" => $apartment_number
        ];
        return $this->insert("clients", $conditions);
    }
}
