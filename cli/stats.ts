import chalk from 'chalk';
import Table from 'cli-table3';
import ProgressBar from 'progress';
import { PortCallsDurations } from '../src/services/stats.service';
import build, { PortsCallsStatisticalData } from '../src/stats.factory';

const generateTopFive = (data: PortCallsDurations[]) => {
    const table = new Table({
        head: ['#', 'Port', 'Calls'],
    });

    data.forEach(({ id, name, durations }) => {
        table.push(
            [id, name, durations.length]
        )
    })

    return table.toString();
}

const generatePercentilesForCallsDurationTable = (data: PortsCallsStatisticalData) => {
    const table = new Table({
        head: ['#', 'Port', '5th', '25th', '50th', '75th', '90th'],
    });

    data.percentilesForCallsDuration.forEach(({ id, name, percentiles }) => {
        table.push(
            [id, name, percentiles.get(0.05), percentiles.get(0.2), percentiles.get(0.5), percentiles.get(0.75), percentiles.get(0.9)],
        )
    })

    return table.toString();
}

const runTimer = () => {
    const bar = new ProgressBar(':percent', { total: 10 });
    const timer = setInterval(() => {
        bar.tick();
        if (bar.complete) {
            clearInterval(timer);
        }
    }, 100);
};

const main = async () => {
    runTimer();

    const data = await build('all');

    console.log(chalk.blue.bold('Top five ports with the most calls:'));
    console.log(generateTopFive(data.topFiveWithTheMostCalls).toString(), '\n');

    console.log(chalk.blue.bold('Top five ports with the fewest calls:'));
    console.log(generateTopFive(data.topFiveWithTheFewestCalls).toString(), '\n');

    console.log(chalk.blue.bold('Percentiles for calls duration:'));
    console.log(generatePercentilesForCallsDurationTable(data).toString());
};

main();
