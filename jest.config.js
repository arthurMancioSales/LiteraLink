/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
        '^@/public/images/user/default_user_image.jpg$': '<rootDir>/test_variables/imageMock.js',
    },
    setupFiles: ["<rootDir>/src/utils/setup-tests.ts"]
};
