const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Modern approach uses ts-jest or SWC instead of Babel
  preset: "ts-jest",
  // Alternatively, use SWC (which is already included in Next.js)
  // transform: {
  //   '^.+\\.(ts|tsx)$': ['@swc/jest'],
  // },
  testMatch: ["**/*.spec.ts", "**/*.spec.tsx", "**/*.test.ts", "**/*.test.tsx"],
};

module.exports = createJestConfig(customJestConfig);
