module.exports = {
  "preset": "ts-jest",
  "clearMocks": true,
  "testEnvironment": "node",
  "bail": true,
  "verbose": true,
  "collectCoverageFrom": ["./src/**/*.ts"],
  "moduleNameMapper": {
    "@presentation/(.*)$": "<rootDir>/src/presentation/$1",
    "@domain/(.*)$": "<rootDir>/src/domain/$1",
    "@infra/(.*)$": "<rootDir>/src/infra/$1",
    "@main/(.*)$": "<rootDir>/src/main/$1",
    "@utils/(.*)$": "<rootDir>/src/utils/$1",
    "@data/(.*)$": "<rootDir>/src/data/$1"
  }
}
