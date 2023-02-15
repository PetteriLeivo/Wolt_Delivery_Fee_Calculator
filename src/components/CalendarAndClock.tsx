import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CalendarAndClock = (props: {
    startDate: Date,
    setStartDate: React.Dispatch<React.SetStateAction<Date>>
}) => {



    return (
        <DatePicker dateFormat={"dd/MM/yyyy"} selected={props.startDate} onChange={(date: Date) => props.setStartDate(date)} showTimeSelect />)


}

export default CalendarAndClock