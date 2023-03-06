import { getAllWithPercentiles, getTopFiveWithTheFewestCalls, getTopFiveWithTheMostCalls } from './stats.service'

test('should get top five with the most calls', () => {
    const portCalls = [
        {
            id: '1',
            name: 'Port 1',
            durations: [1, 2, 3, 4, 5],
        },
        {
            id: '2',
            name: 'Port 2',
            durations: [1, 2, 3, 4],
        },
        {
            id: '3',
            name: 'Port 3',
            durations: [1, 2, 3],
        },
        {
            id: '4',
            name: 'Port 4',
            durations: [1, 2],
        },
        {
            id: '5',
            name: 'Port 5',
            durations: [1],
        },
        {
            id: '6',
            name: 'Port 6',
            durations: [],
        },
    ]

    const result = getTopFiveWithTheMostCalls(portCalls)

    expect(result).toEqual([
        {
            id: '1',
            name: 'Port 1',
            durations: [1, 2, 3, 4, 5],
        },
        {
            id: '2',
            name: 'Port 2',
            durations: [1, 2, 3, 4],
        },
        {
            id: '3',
            name: 'Port 3',
            durations: [1, 2, 3],
        },
        {
            id: '4',
            name: 'Port 4',
            durations: [1, 2],
        },
        {
            id: '5',
            name: 'Port 5',
            durations: [1],
        },
    ])
})

test('should get top five with the fewest calls', () => {
    const portCalls = [
        {
            id: '1',
            name: 'Port 1',
            durations: [1, 2, 3, 4, 5],
        },
        {
            id: '2',
            name: 'Port 2',
            durations: [1, 2, 3, 4],
        },
        {
            id: '3',
            name: 'Port 3',
            durations: [1, 2, 3],
        },
        {
            id: '4',
            name: 'Port 4',
            durations: [1, 2],
        },
        {
            id: '5',
            name: 'Port 5',
            durations: [1],
        },
        {
            id: '6',
            name: 'Port 6',
            durations: [],
        },
    ]

    const result = getTopFiveWithTheFewestCalls(portCalls)

    expect(result).toEqual([
        {
            id: '6',
            name: 'Port 6',
            durations: [],
        },
        {
            id: '5',
            name: 'Port 5',
            durations: [1],
        },
        {
            id: '4',
            name: 'Port 4',
            durations: [1, 2],
        },
        {
            id: '3',
            name: 'Port 3',
            durations: [1, 2, 3],
        },
        {
            id: '2',
            name: 'Port 2',
            durations: [1, 2, 3, 4],
        },
    ])
})

test('should get all with percentiles', () => {
    const portCalls = [
        {
            id: '1',
            name: 'Port 1',
            durations: [1053, 5642, 4534, 4535, 6756],
        },
        {
            id: '2',
            name: 'Port 2',
            durations: [1053, 5642, 4534, 4535],
        },
        {
            id: '3',
            name: 'Port 3',
            durations: [1053, 5642, 4534],
        },
        {
            id: '4',
            name: 'Port 4',
            durations: [],
        },
    ]

    const result = getAllWithPercentiles(portCalls)

    expect(result).toEqual([
        {
            id: '1',
            name: 'Port 1',
            percentiles: new Map([
                [0.05, 1053],
                [0.2, 4534],
                [0.5, 4535],
                [0.75, 5642],
                [0.9, 6756],
            ]),
        },
        {
            id: '2',
            name: 'Port 2',
            percentiles: new Map([
                [0.05, 1053],
                [0.2, 1053],
                [0.5, 4534.5],
                [0.75, 5088.5],
                [0.9, 5642],
            ]),
        },
        {
            id: '3',
            name: 'Port 3',
            percentiles: new Map([
                [0.05, 1053],
                [0.2, 1053],
                [0.5, 4534],
                [0.75, 5642],
                [0.9, 5642],
            ]),
        },
        {
            id: '4',
            name: 'Port 4',
            percentiles: new Map([
                [0.05, 0],
                [0.2, 0],
                [0.5, 0],
                [0.75, 0],
                [0.9, 0],
            ]),
        },
    ])
})
