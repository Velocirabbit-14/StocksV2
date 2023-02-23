module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['client/**/*.{js,jsx,html}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//     "jest": {
//         "automock": false,
//         "setupFiles": [
//           "./setupJest.js"
//         ]
//       }
}