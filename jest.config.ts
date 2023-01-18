import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [`<rootDir>/src/test/jest-setup.ts`],
  testPathIgnorePatterns: [`node_modules`, `\\.yarn`, `<rootDir>.*/public`],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!<rootDir>/node_modules/**/*',
    '!<rootDir>/src/test/**/*',
  ],
  verbose: true,
}

export default config
