import dotenv from "dotenv";
dotenv.config();

export const config = {
    "port": process.env.PORT,
    "mongoUrl": process.env.MONGO_URL,
    "db_host": process.env.DB_HOST,
    "db_user": process.env.DB_USER,
    "db_pass": process.env.DB_PASS
}