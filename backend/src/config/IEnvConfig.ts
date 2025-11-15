interface IEnvConfig {
  port: number;
  mongoUri: string;
  apiPrefix: string;
  jwtSecret: string;
}

export default IEnvConfig;
