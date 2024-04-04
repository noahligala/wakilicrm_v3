import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { format } from 'date-fns';

export default function CustomMonthLayout() {
  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (newDate) => {
    if (!(newDate instanceof Date)) {
      // If newDate is not already a Date object, try to create a Date object from it
      newDate = new Date(newDate);
    }
    // Ensure the selected date is set to the beginning of the day (midnight)
    // This prevents any time zone discrepancies or unexpected behavior
    const normalizedDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
    setSelectedDate(normalizedDate);
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const onDaySelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <React.Fragment>
        <DateCalendar
          views={['day']}
          date={selectedDate || new Date()} // Set initial date to current date if none selected
          onChange={handleDateChange}
          onDaySelect={onDaySelect} // Pass onDaySelect to handle day selection
          renderDay={(day, _value, DayComponentProps) => (
            <PickersDay
              {...DayComponentProps}
              onClick={() => handleDayClick(day.date)} // Call handleDayClick with date on day click
              sx={{
                ...(day.isToday && { backgroundColor: 'primary.main', color: 'white' }),
                ...(day.date && day.date.getDay && day.date.getDay() === 0 && { color: 'error.main' }), // Check if day.date has getDay method
                ...(day.date && day.date.getDay && day.date.getDay() === 6 && { color: 'info.main' }), // Check if day.date has getDay method
              }}
            >
              {format(day.date, 'd')}
            </PickersDay>
          )}
        />

        {/* Render day view */}
        
      </React.Fragment>
    </LocalizationProvider>
  );
}
