import { calcDateTimeDiffInMinutes } from "./datetime.service";

test.each([
    [new Date("2022-01-01T08:00:00+00:00"), new Date("2022-01-01T09:00:00+00:00"), 60],
    [new Date("2022-01-01T08:00:00+00:00"), new Date("2022-01-01T08:30:00+00:00"), 30],
    [new Date("2022-01-01T08:00:00+00:00"), new Date("2022-01-01T08:00:00+00:00"), 0],
    [new Date("2022-01-01T08:00:00+00:00"), new Date("2022-01-01T07:30:00+00:00"), 30],
    [new Date("2022-01-01T08:00:00+00:00"), new Date("2022-01-01T07:00:00+00:00"), 60],
])("should calculate date time diff", (start, end, expected) => {
    const result = calcDateTimeDiffInMinutes(start, end);
    expect(result).toBe(expected);
});
