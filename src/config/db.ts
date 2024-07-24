import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();
console.log();

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + "/../models/**/*"],
  logging:false
});

export default db;
