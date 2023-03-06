import api from './client';
import { getPortsCalls, getVessels, getVesselSchedule, Vessel, VesselSchedule } from './vessel';

jest.mock('./client', () => ({
    get: jest.fn(),
}));

describe('getVessels', () => {
    test('should return an array of vessels when the API call is successful', async () => {
        const mockData: Vessel[] = [
            { imo: 1, name: 'Vessel1' },
            { imo: 2, name: 'Vessel2' },
        ];
        (api.get as jest.MockedFunction<typeof api.get>).mockResolvedValue({ data: mockData });
        const result = await getVessels();
        expect(result).toEqual(mockData);
    });

    test('should return null when the API call fails', async () => {
        (api.get as jest.MockedFunction<typeof api.get>).mockRejectedValueOnce(new Error('API Error'));
        const result = await getVessels();
        expect(result).toBeNull();
    });
});

describe('getVesselSchedule', () => {
    test('should return a vessel schedule object when the API call is successful', async () => {
        const mockData: VesselSchedule = {
            vessel: { imo: 1, name: 'Vessel1' },
            portCalls: [],
        };
        (api.get as jest.MockedFunction<typeof api.get>).mockResolvedValue({ data: mockData });
        const result = await getVesselSchedule(1);
        expect(result).toEqual(mockData);
    });

    test('should return null when the API call fails', async () => {
        (api.get as jest.MockedFunction<typeof api.get>).mockRejectedValueOnce(new Error('API Error'));
        const result = await getVesselSchedule(1);
        expect(result).toBeNull();
    });
});

describe('getPortsCalls', () => {
    test('should return an array of port calls when all API calls are successful', async () => {
        const mockVessels: Vessel[] = [
            { imo: 1, name: 'Vessel1' },
            { imo: 2, name: 'Vessel2' },
        ];
        const mockSchedules: VesselSchedule[] = [
            {
                vessel: { imo: 1, name: 'Vessel1' },
                portCalls: [],
            },
            {
                vessel: { imo: 2, name: 'Vessel2' },
                portCalls: [],
            },
        ];
        (api.get as jest.MockedFunction<typeof api.get>)
            .mockResolvedValueOnce({ data: mockVessels })
            .mockResolvedValueOnce({ data: mockSchedules[0] })
            .mockResolvedValueOnce({ data: mockSchedules[1] });
        const result = await getPortsCalls();
        expect(result).toEqual([]);
    });

    test('should throw an error when unable to get vessels', async () => {
        (api.get as jest.MockedFunction<typeof api.get>).mockRejectedValueOnce(new Error('API Error'));
        await expect(getPortsCalls()).rejects.toThrowError('Unable to get vessels');
    });

    test('should throw an error when unable to get schedule for vessels', async () => {
        const mockError = new Error('Unable to get schedule for vessels');
        const getVesselScheduleMock = jest.fn().mockRejectedValue(mockError);
        api.get = getVesselScheduleMock;

        await expect(getPortsCalls()).rejects.toThrowError('Unable to get vessels');
    })
});