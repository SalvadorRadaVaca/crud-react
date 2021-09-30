<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorizations, X-Requested-With");
//Connect to database with user, password and database name
$server = "localhost"; $user = "root"; $password = "040319659"; $databaseName = "employees";
$dbConnection = new mysqli($server, $user, $password, $databaseName);

//Consult data and receive a key to consult such data with such key
if(isset($_GET["consult"])) {
    $sqlEmployees = mysqli_query($dbConnection, "SELECT * FROM employees WHERE id=".$_GET["consult"]);
    if(mysqli_num_rows($sqlEmployees) > 0) {
        $employees = mysqli_fetch_all($sqlEmployees, MYSQLI_ASSOC);
        echo json_encode($employees);
        exit();
    }
    else { echo json_encode(["success"=>0]); }
} 

//Delete but it must be send a key (to delete)
if(isset($_GET["delete"])) {
    $sqlEmployees = mysqli_query($dbConnection, "DELETE FROM employees WHERE id=".$_GET["delete"]);
    if($sqlEmployees) {
        echo json_encode(["success"=>1]);
        exit();
    }
    else { echo json_encode(["success"=>0]); }
}

//Insert a new register and receive in method post the data of name and email
if(isset($_GET["insert"])){
    $data = json_decode(file_get_contents("php://input"));
    $name = $data->name;
    $email = $data->email;
    if(($email!="")&&($name!="")){
        $sqlEmployees = mysqli_query($dbConnection, "INSERT INTO employees(name, email) VALUES ('$name','$email')");
        echo json_encode(["success"=>1]);
    }
    exit();
}

//Update data but receive data of name, email and a key to make the update
if(isset($_GET["update"])) {
    $data = json_decode(file_get_contents("php://input"));
    $id = (isset($data->id))?$data->id:$_GET["update"];
    $name = $data->name;
    $email = $data->email;
    $sqlEmployees = mysqli_query($dbConnection, "UPDATE employees SET name='$name', email='$email' WHERE id='$id'");
    echo json_encode(["success"=>1]);
    exit();
}

//Consult all registers of the employees table
$sqlEmployees = mysqli_query($dbConnection, "SELECT * FROM employees");
if(mysqli_num_rows($sqlEmployees) > 0) {
    $employees = mysqli_fetch_all($sqlEmployees, MYSQLI_ASSOC);
    echo json_encode($employees);
}
else { echo json_encode(["success"=>0]); }

?>