import { getPortsCalls } from './api/vessel'
import { calcDateTimeDiffInMinutes } from './services/datetime.service'
import {
    getAllWithPercentiles,
    getTopFiveWithTheFewestCalls,
    getTopFiveWithTheMostCalls,
    PortCallsDurations,
    PortCallsDurationsPercentiles
} from './services/stats.service'

export interface PortsCallsStatisticalData {
    topFiveWithTheMostCalls: PortCallsDurations[]
    topFiveWithTheFewestCalls: PortCallsDurations[]
    percentilesForCallsDuration: PortCallsDurationsPercentiles[]
}

export type StatsType = 'all' | 'percentiles' | 'topFiveWithTheMostCalls' | 'topFiveWithTheFewestCalls'

const buildAll = async () => {
    const portsCalls = await getPortsCalls()

    const portsCallsDurations = portsCalls
        .filter(({ isOmitted }) => !isOmitted)
        .reduce((acc, { port, arrival, departure }) => {
            const callDurationInMinutes = calcDateTimeDiffInMinutes(new Date(arrival), new Date(departure));
            const alreadyExistingPort = acc.find(({ id }) => id === port.id);

            if (alreadyExistingPort) {
                alreadyExistingPort.durations.push(callDurationInMinutes);
            } else {
                acc.push({
                    id: port.id,
                    name: port.name,
                    durations: [callDurationInMinutes],
                });
            }

            return acc;
        }, [] as PortCallsDurations[]);

    return {
        topFiveWithTheMostCalls: getTopFiveWithTheMostCalls(portsCallsDurations),
        topFiveWithTheFewestCalls: getTopFiveWithTheFewestCalls(portsCallsDurations),
        percentilesForCallsDuration: getAllWithPercentiles(portsCallsDurations),
    }
}

const build = (type: StatsType): Promise<PortsCallsStatisticalData> => {
    switch (type) {
        case 'all':
            return buildAll()
        case 'percentiles':
            throw new Error('Unsupported stats type')
        case 'topFiveWithTheMostCalls':
            throw new Error('Unsupported stats type')
        case 'topFiveWithTheFewestCalls':
            throw new Error('Unsupported stats type')
        default:
            throw new Error('Invalid stats type')
    }
}

export default build