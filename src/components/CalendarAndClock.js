import React from "react";
import DatePicker from "react-datepicker";
const CalendarAndClock = () => {
    const [startDate, setStartDate] = useState(new Date())

    return (
        <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)}/>
    )


}

export default CalendarAndClock;