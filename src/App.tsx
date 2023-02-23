import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import ChartByDate from "./components/ChartByDate";
import { ScheduleData } from "./Data";
import { AiFillCalendar } from "react-icons/ai";

export interface ScheduleDataType {
  schedule_time: string;
  slot: string;
  item_date: string;
}

// To format the date in to string
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const App: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleDataType[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2021-05-19")
  );

  // to grab data
  useEffect(() => {
    const formattedDate = formatDate(selectedDate);
    const filteredData: ScheduleDataType[] = ScheduleData.filter(
      (item) => item.item_date === formattedDate
    );
    setScheduleData(filteredData);
  }, [selectedDate]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="App">
      <div className="date__picker">
        <AiFillCalendar />
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          shouldCloseOnSelect
        />
      </div>
      <div className="bar__chart">
        <ChartByDate
          scheduleData={scheduleData}
          selectedDate={formatDate(selectedDate)}
        />
      </div>
    </div>
  );
};

export default App;
