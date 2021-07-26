<?php 

 
    require_once("./Models/Model_test.php");

    class test 
    {
        private $response;
        private $errors = "";
        private $model;

        public function __construct()
        {
            $this->model = new Model_test();
        }


        public function test($key) {

            $arr = [1,2,3,4];
            foreach($arr as $item) 
            {
                echo $item;
            }
            $this->response = $this->model->getFakeData();
            $this->response["my_key"] = $key;
            return $this->response;
        }


        
    }

?>