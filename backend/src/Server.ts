import bodyParser from "body-parser";
import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router";
import IEnvConfig from "./config/IEnvConfig";

export class Server {
  private app: Express;

  constructor(private config: IEnvConfig) {
    this.app = express();
  }

  get application(): Express {
    return this.app;
  }

  public bootstrap(): void {
    this.connnectDb();
    this.setUpBodyParser();
    this.setUpCors();
    this.setupRoutes();
  }

  public async connnectDb(): Promise<void> {
    const { mongoUri } = this.config;
    try {
      await mongoose.connect(mongoUri);
      console.info("MongoDB connected");
    } catch (error: any) {
      console.info("Mongo Db Connection Error - ", error);
      process.exit(1);
    }
  }

  public setupRoutes(): void {
    const { apiPrefix } = this.config;
    this.app.use(apiPrefix, router);
  }

  public setUpBodyParser(): void {
    // this.app.use(express.json());
    this.app.use(bodyParser.json({ limit: "100mb" }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  public setUpCors(): void {
    this.app.use(cors());
  }

  public run(): void {
    const { port } = this.config;
    this.app.listen(port, () => {
      console.info(`[server]: Server is running at http://localhost:${port}`);
    });
  }
}
