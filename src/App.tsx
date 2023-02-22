import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import ChartByDate from "./components/ChartByDate";

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2021-05-19")
  );

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="App">
      <div className="date__picker">
        <DatePicker selected={selectedDate} onChange={handleDateChange} />
        <div className="bar__chart" style={{ width: 700 }}>
          <ChartByDate selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default App;
