import { sortBy } from "./sort.service"
import { quantile } from 'simple-statistics'

interface Port {
    id: string
    name: string
}
export interface PortCallsDurationsPercentiles extends Port {
    percentiles: Map<number, number>
}

export interface PortCallsDurations extends Port {
    durations: number[]
}

export const getTopFiveWithTheMostCalls = (portCalls: PortCallsDurations[]): PortCallsDurations[] => {
    return sortBy<PortCallsDurations>(portCalls, (portCall) => portCall.durations.length, "desc").slice(0, 5)
}

export const getTopFiveWithTheFewestCalls = (portCalls: PortCallsDurations[]): PortCallsDurations[] => {
    return sortBy<PortCallsDurations>(portCalls, (portCall) => portCall.durations.length, "asc").slice(0, 5)
}

export const getAllWithPercentiles = (portCalls: PortCallsDurations[]): PortCallsDurationsPercentiles[] => {
    const percentileDistribution = [0.05, 0.2, 0.5, 0.75, 0.9]

    return portCalls.reduce((acc, portCall) => {
        const portCallDurationPercentiles: PortCallsDurationsPercentiles = {
            id: portCall.id,
            name: portCall.name,
            percentiles: new Map(),
        }

        percentileDistribution.forEach(percentile => {
            if (portCall.durations.length === 0) {
                portCallDurationPercentiles.percentiles.set(percentile, 0)
            } else {
                portCallDurationPercentiles.percentiles.set(percentile, quantile(portCall.durations, percentile))
            }
        })

        acc.push(portCallDurationPercentiles)

        return acc
    }, [] as PortCallsDurationsPercentiles[])
}