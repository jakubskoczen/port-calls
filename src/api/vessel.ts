import api from './client';

interface Vessel {
    imo: number;
    name: string;
}

interface Port {
    id: string;
    name: string;
}

interface LogEntry {
    updatedField: string;
    arrival?: string;
    departure?: string;
    isOmitted?: boolean;
    createdDate: Date;
}

interface VesselSchedule {
    vessel: Vessel;
    portCalls: PortCall[];
}

export interface PortCall {
    arrival: string;
    departure: string;
    createdDate: Date;
    isOmitted: boolean;
    service: string;
    port: Port;
    logEntries: LogEntry[];
}

const getVessels = async (): Promise<Vessel[] | null> => {
    try {
        const { data } = await api.get<Vessel[]>(`/vessels`)
        return data
    } catch (_) {
        return null;
    }
}

const getVesselSchedule = async (vesselIMO: number): Promise<VesselSchedule | null> => {
    try {
        const { data } = await api.get<VesselSchedule>(`/schedule/${vesselIMO}`)
        return data
    } catch (_) {
        return null;
    }
}

export const getPortsCalls = async (): Promise<PortCall[]> => {
    const vessels = await getVessels()
    if (!vessels) {
        throw new Error('Unable to get vessels')
    }

    const vesselsSchedules = await Promise.allSettled(
        vessels.map(vessel => getVesselSchedule(vessel.imo).catch(e => ({ status: 'rejected', reason: e })))
    )
    const rejected = vesselsSchedules.filter(result => result.status === 'rejected')
    if (rejected.length) {
        throw new Error('Unable to get schedule for vessels');
    }

    const portCalls: PortCall[] = vesselsSchedules.
        filter((result): result is PromiseFulfilledResult<VesselSchedule> => result.status === 'fulfilled').
        map(result => result.value).
        flatMap(result => result.portCalls);

    return portCalls
}