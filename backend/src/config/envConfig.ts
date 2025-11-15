import { config } from "dotenv";
import IEnvConfig from "./IEnvConfig";
import { API_PREFIX } from "../utils/constants";

config();

const envVar = process.env;

const envConfig = Object.freeze({
    port: envVar.PORT || 3080,
    mongoUri: envVar.MONGO_URI,
    apiPrefix: API_PREFIX,
    jwtSecret: envVar.JWT_SECRET
}) as IEnvConfig;

export default envConfig;