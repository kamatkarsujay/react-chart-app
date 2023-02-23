import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Bar } from "react-chartjs-2";
import { ScheduleData } from "../Data";
import { individualBarData } from "./ChartByDate";
import "../App.css";

interface Props {
  chartData: individualBarData | undefined;
}

const AggregatedChart = ({ chartData }: Props) => {
  const [counts, setCounts] = useState<number[]>([]);

  // To process the data and display the data with respect to time
  useEffect(() => {
    function getCountsByTimeSlotForDate(
      item_date: string,
      date: string
    ): TimeSlotCount {
      const dataForDate = ScheduleData.filter(
        (item) => item.item_date === item_date
      );
      const timeSlots = ["09 to 12", "12 to 15", "15 to 18", "18 to 21"];
      const countsByTimeSlot = timeSlots.reduce((accumulator, timeSlot) => {
        accumulator[timeSlot] = dataForDate.filter((item) => {
          const itemTime = new Date(item.schedule_time);
          const schedule_date = date;
          const startTime = new Date(
            `${schedule_date} ${timeSlot.split(" to ")[0]}:00:00 GMT+0530`
          );
          const endTime = new Date(
            `${schedule_date} ${timeSlot.split(" to ")[1]}:00:00 GMT+0530`
          );
          return itemTime >= startTime && itemTime < endTime;
        }).length;
        return accumulator;
      }, {} as TimeSlotCount);
      return countsByTimeSlot;
    }

    const count = getCountsByTimeSlotForDate(
      chartData!.item_date,
      chartData!.label
    );
    setCounts(Object.values(count));
  }, [chartData]);

  type TimeSlotCount = Record<string, number>;

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
    labels: ["9am to 12pm", "12pm to 3pm", "3pm to 6pm", "6pm to 9pm"],
    datasets: [
      {
        label: `Deliveries scheduled throughout the day`,
        data: counts,
        backgroundColor: ["green"],
        borderWidth: 1,
        borderColor: ["black"],
      },
    ],
  };

  return (
    <div className="bar__chart--individual">
      <Bar data={data} options={options} />
    </div>
  );
};
export default AggregatedChart;
