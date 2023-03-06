import buildStats from './stats.factory'

test("should throw error for invalid type", async () => {
    try {
        await buildStats('invalid' as any)
    } catch ({ message }) {
        expect(message).toBe('Invalid stats type')
    }
})

test("should throw error for unsupported type", async () => {
    try {
        await buildStats('percentiles' as any)
    } catch ({ message }) {
        expect(message).toBe('Unsupported stats type')
    }

    try {
        await buildStats('topFiveWithTheMostCalls' as any)
    } catch ({ message }) {
        expect(message).toBe('Unsupported stats type')
    }

    try {
        await buildStats('topFiveWithTheFewestCalls' as any)
    } catch ({ message }) {
        expect(message).toBe('Unsupported stats type')
    }
})