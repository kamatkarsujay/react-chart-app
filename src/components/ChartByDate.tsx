import { useEffect, useRef, useState } from "react";
import { Bar, getElementsAtEvent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ScheduleDataType } from "../App";
import AggregatedChart from "./AggregatedChart";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  scheduleData: ScheduleDataType[];
  selectedDate: string;
}

export interface individualBarData {
  label: string;
  count: number;
  item_date: string;
}

const ChartByDate = ({ scheduleData, selectedDate }: Props) => {
  const [individualData, setIndividualData] = useState<individualBarData>();

  // Creates a label array for graph
  const date = scheduleData.map((item) => item.schedule_time.split(" ")[0]);
  const labels: string[] = [];
  date.forEach((item) => {
    if (!labels.includes(item)) labels.push(item);
  });

  // Creates a date array for graph
  const chartData: number[] = Object.values(
    scheduleData.reduce((acc: Record<string, number>, item) => {
      const count = item.schedule_time.split(" ")[0];
      acc[count] = acc[count] ? acc[count] + 1 : 1;
      return acc;
    }, {})
  );

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Deliveries`,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Deliveries scheduled on ${selectedDate}`,
        data: chartData,
        backgroundColor: ["blue"],
        borderWidth: 1,
        borderColor: ["black"],
      },
    ],
  };

  // To handle the click event
  const chartRef = useRef<any>(null);
  const onClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (getElementsAtEvent(chartRef.current, event).length > 0) {
      const datasetIndexNum = getElementsAtEvent(chartRef.current, event)[0]
        .datasetIndex;
      const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index;
      const labelCount: individualBarData = {
        label: data.labels[dataPoint],
        count: data.datasets[datasetIndexNum].data[dataPoint],
        item_date: selectedDate,
      };
      setIndividualData(labelCount);
    }
  };

  return (
    <>
      <Bar ref={chartRef} onClick={onClick} options={options} data={data} />
      {individualData ? <AggregatedChart chartData={individualData} /> : null}
    </>
  );
};
export default ChartByDate;
