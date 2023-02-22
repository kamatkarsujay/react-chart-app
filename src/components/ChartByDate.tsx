import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ScheduleData } from "../Data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ScheduleDataType {
  schedule_time: string;
  slot: string;
  item_date: string;
}

interface Props {
  selectedDate: Date;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const ChartByDate = ({ selectedDate }: Props) => {
  const [scheduleData, setScheduleData] = useState<ScheduleDataType[]>([]);

  useEffect(() => {
    const formattedDate = formatDate(selectedDate);
    const filteredData: ScheduleDataType[] = ScheduleData.filter(
      (item) => item.item_date === formattedDate
    );
    setScheduleData(filteredData);
  }, [selectedDate]);

  const date = scheduleData.map((item) => item.schedule_time.split(" ")[0]);

  const labels: string[] = [];
  date.forEach((item, index, array) => {
    if (array.indexOf(item) !== index && !labels.includes(item))
      labels.push(item);
  });

  const chartData: number[] = Object.values(
    scheduleData.reduce((acc: Record<string, number>, item) => {
      const count = item.schedule_time.split(" ")[0];
      acc[count] = acc[count] ? acc[count] + 1 : 1;
      return acc;
    }, {})
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Deliveries scheduled on ${formatDate(selectedDate)}`,
        data: chartData,
        backgroundColor: ["blue"],
      },
    ],
  };

  return <Bar data={data} />;
};
export default ChartByDate;
