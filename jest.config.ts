process.env.TZ = 'Asia/Singapore'

module.exports = {
    roots: ['<rootDir>'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
        '^.+\\.module\\.(css|sass|scss)$',
    ],
    modulePaths: [],
    testEnvironment: 'jest-environment-jsdom',
    testRegex: '^.+\\.test\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
