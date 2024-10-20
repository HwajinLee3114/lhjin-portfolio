import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.(test|spec).ts", "**/?(*.)+(spec|test).ts"],
};

export default config;
