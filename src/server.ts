import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan"
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
//Conectar a la base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
  } catch (error) {
    console.log(colors.bgRed.bold("Hubo un error al conectar a la DB"));
  }
}

connectDB();

//instancia de express
const server = express();

//Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callBack) {
    if(origin === process.env.FRONTEND_URL){
      callBack(null,true);
      return;      
    }
    callBack(new Error("Error de CORS"));
      
  },
};
server.use(cors(corsOptions));
//Leer datos de formularios
server.use(express.json());
server.use(morgan("dev"))

//Routing
server.use("/products", router);

//Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default server;
