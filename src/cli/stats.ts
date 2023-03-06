import * as dotenv from 'dotenv'
import Table from "cli-table3";
import build, { PortsCallsStatisticalData } from "../stats.factory";

dotenv.config()

build('all').then((data) => {
  console.log('Top five ports with the most calls:')
  const topFiveWithTheMostCallsTable = generateTopFiveWithTheMostCallsTable(data);
  console.log(topFiveWithTheMostCallsTable.toString());

  console.log('Top five ports with the fewest calls:')
  const topFiveWithTheFewestCallsTable = generateTopFiveWithTheFewestCallsTable(data);
  console.log(topFiveWithTheFewestCallsTable.toString());

  console.log('Percentiles for calls duration:')
  const percentilesForCallsDurationTable = generatePercentilesForCallsDurationTable(data);
  console.log(percentilesForCallsDurationTable.toString());
})

const generateTopFiveWithTheMostCallsTable = (data: PortsCallsStatisticalData) => {
  const table = new Table({
    head: ['#', 'Port', 'Calls'],
  });

  data.topFiveWithTheMostCalls.forEach((item) => {
    table.push(
      [item.id, item.name, item.durations.length],
    )
  })

  return table.toString();
}

const generateTopFiveWithTheFewestCallsTable = (data: PortsCallsStatisticalData) => {
  const table = new Table({
    head: ['#', 'Port', 'Calls'],
  });

  data.topFiveWithTheFewestCalls.forEach((item) => {
    table.push(
      [item.id, item.name, item.durations.length],
    )
  })

  return table.toString();
}

const generatePercentilesForCallsDurationTable = (data: PortsCallsStatisticalData) => {
  const table = new Table({
    head: ['#', 'Port', '5th', '25th', '50th', '75th', '90th'],
  });

  data.percentilesForCallsDuration.forEach((item) => {
    table.push(
      [item.id, item.name, item.percentiles.get(0.05), item.percentiles.get(0.2), item.percentiles.get(0.5), item.percentiles.get(0.75), item.percentiles.get(0.9)],
    )
  })

  return table.toString();
}