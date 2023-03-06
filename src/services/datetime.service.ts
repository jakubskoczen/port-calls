const calcDateTimeDiffInMinutes = (start: Date, end: Date): number => {
    return Math.abs(end.getTime() - start.getTime()) / 1000 / 60
};

export { calcDateTimeDiffInMinutes };
