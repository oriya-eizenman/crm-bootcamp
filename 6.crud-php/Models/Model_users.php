<?php

require_once("Model_crud.php");

class Model_users extends Model_crud
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAllUsers()
    {
        return $this->getAll("bakery_user", null, null);
        //     $users = $this->getDB()
        //     ->query("SELECT * FROM  bakery_user")
        //     ->fetch_all(MYSQLI_ASSOC);
        // return $users;
    }
}
