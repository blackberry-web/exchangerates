const config = {
    preset: 'ts-jest',
    verbose: true,
    testPathIgnorePatterns: ["<rootDir>/node_modules/", "/<rootDir>/dist/"],
    coverageReporters: ["json", "html"],
    collectCoverageFrom: [
      "<rootDir>/src/**/*.ts"
    ],
    testMatch: ["<rootDir>/src/**/*.spec.ts"],
  };

export default config;