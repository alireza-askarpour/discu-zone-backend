export interface IDatabaseConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  dialect: string;
  nameTest: string;
  nameDevelopment: string;
  nameProduction: string;
}
