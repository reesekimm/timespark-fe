import type { Config } from 'jest'

const config: Config = {
  transform: {
    '\\.[t]sx?$': 'ts-jest',
    '\\.[j]sx?$': 'babel-jest'
  },
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/../../__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/../../__mocks__/styleMock.js'
  },
  transformIgnorePatterns: ['\\react-dnd'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['node_modules', '\\.yarn', '<rootDir>.*/public'],
  verbose: true
}

export default config
