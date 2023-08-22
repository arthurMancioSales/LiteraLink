/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
        '^@/public/images/user/default_user_image.jpg$': '<rootDir>/test_variables/imageMock.js',
    },
    setupFiles: ["<rootDir>/src/utils/setup-tests.ts"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.(js)$": "babel-jest",
    },
    transformIgnorePatterns: [
        'node_modules/(?!' + 
            [
                'node-fetch',
                'next/types',
                'supertest',
                'fetch-blob',
                'data-uri-to-buffer',
                'jest-runtime',
                'formdata-polyfill'
            ].join('|') +
        ')',
    ],
};
