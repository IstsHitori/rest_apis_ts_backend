import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
  try {
    await db.sync({ force: true });
    console.log("Datos eliminados correctamente");
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

//Procces es un codigo que se ejecuta desde el comand line tools de node
if(process.argv[2] === "--clear"){
    clearDB()
}

console.log(process.argv);
