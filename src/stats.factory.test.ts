import buildStats, { StatsType } from './stats.factory'

test("should throw error for invalid type", async () => {
    try {
        await buildStats('invalid' as StatsType)
    } catch ({ message }) {
        expect(message).toBe('Invalid stats type')
    }
})

test("should throw error for unsupported type", async () => {
    try {
        await buildStats('percentiles')
    } catch ({ message }) {
        expect(message).toBe('Unsupported stats type')
    }

    try {
        await buildStats('topFiveWithTheMostCalls')
    } catch ({ message }) {
        expect(message).toBe('Unsupported stats type')
    }

    try {
        await buildStats('topFiveWithTheFewestCalls')
    } catch ({ message }) {
        expect(message).toBe('Unsupported stats type')
    }
})