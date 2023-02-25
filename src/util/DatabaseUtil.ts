import dotenv from "dotenv";

export default class DatabaseUtil {

    public static getDatabaseUrl() {
        dotenv.config();
        const url = process.env.LOCAL_MONGO_URI;
        if (url === undefined) {
            throw new Error("url for database connection is undefined!");
        }
        return url;
    }

}