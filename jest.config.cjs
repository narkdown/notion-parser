const process = require('process');

process.env.TZ = 'UTC';

/** @type {import("@jest/types").Config.InitialOptions } */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  globalSetup: '',
};
