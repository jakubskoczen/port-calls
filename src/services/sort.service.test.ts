import { sortBy, SortingOrder } from "./sort.service";

type PortStats = Record<string, number>

test.each([
    [
        [
            { callsCount: 1 },
            { callsCount: 2 },
            { callsCount: 3 },
        ],
        "callsCount",
        "desc",
        [
            { callsCount: 3 },
            { callsCount: 2 },
            { callsCount: 1 },
        ],
    ],
    [
        [
            { callsCount: 1 },
            { callsCount: 2 },
            { callsCount: 3 },
        ],
        "callsCount",
        "asc",
        [
            { callsCount: 1 },
            { callsCount: 2 },
            { callsCount: 3 },
        ],
    ]
])("should sort correctly", (data, key, order, expected) => {
    const result = sortBy<PortStats>(data, (item) => item[key], order as SortingOrder);
    expect(result).toEqual(expected);
});