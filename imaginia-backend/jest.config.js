module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleDirectories: ["node_modules", "src"],
    transform: {
      ".+\\.ts$": "ts-jest",
    },
    testMatch: [
      "<rootDir>/tests/unit/**/*.test.ts",
      "<rootDir>/tests/integration/**/*.test.ts"
    ], 
    setupFiles: ["<rootDir>/tests/setup-envs.ts"],
    moduleNameMapper: {
      "@/(.*)": "<rootDir>/src/$1",
      "@test/(.*)": "<rootDir>/tests/$1",
      "axios": "axios/dist/node/axios.cjs"
    },
    restoreMocks: true,
  };
  