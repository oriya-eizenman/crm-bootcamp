<?php

require_once("Model.php");

class Model_crud extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    // public function getAll($table_name)
    // {
    //     $data = $this->getDB()
    //         ->query("SELECT * FROM $table_name")
    //         ->fetch_all(MYSQLI_ASSOC);
    //     return $data;
    // }

    public function getSpecialQuery($sql)
    {
        return $this->getDB()
            ->query($sql)
            ->fetch_all(MYSQLI_ASSOC);
    }

    public function getAll($table_name, $values = [])
    {
        $where = $this->parseWhere($values);
        $sql = "
            SELECT * FROM 
            $table_name 
            WHERE 1 
            $where 
        ";
        return $this->getDB()
            ->query($sql)
            ->fetch_all(MYSQLI_ASSOC);
    }

    private function parseWhere($values)
    {

        $sql = "";
        foreach ($values as $key => $value) {
            $sql .= "AND $key = '$value'";
        }
        return $sql;
    }

    public function insert($table_name, $arr)
    {
        $_fields = array();
        foreach ($arr as $key => $val) {
            $_fields[$key]  = $val;
        }
        $sql = sprintf('INSERT INTO %s (%s) VALUES ("%s")', $table_name, implode(',', array_keys($_fields)), implode('","', array_values($_fields)));
        $this->getDB()
            ->query($sql);
        return $this->getDB()->insert_id;
    }

    public function delete($table_name, $values)
    {
        $where = $this->parseWhere($values);
        $sql = "
            DELETE FROM 
            $table_name 
            WHERE 1 
            $where 
        ";
        return $this->getDB()
            ->query($sql);
    }

    public function update($data)
    {
        $set_statement = "";
        foreach ($data as $key => $value) {
            $set_statement .= "$key = '$value',";
        }
        $set_statement = substr_replace($set_statement, "", -1);
        $sql = "UPDATE $this->table_name SET $set_statement WHERE (id = $data->id)";
        $res = $this->getDB()->query($sql);
        return $res;
    }
}
