import React, { useState, useRef, useEffect } from "react";
import { Grid, TextField, Box, List, ListItem, ListItemButton } from "@mui/material";

// Function to generate time slots
const generateTimeSlots = () => {
  const timeSlots = [];
  const startTime = new Date();
  startTime.setHours(0, 0, 0, 0); // Set start time to midnight

  for (let i = 0; i < 96; i++) { // 96 slots for 24 hours, 15 minutes apart
    const time = new Date(startTime.getTime() + i * 15 * 60 * 1000); // Add 15 minutes in milliseconds
    timeSlots.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }

  return timeSlots;
};

export default function EditEventTimeSlotsStart() {
  const [selectedTime, setSelectedTime] = useState(""); // State to store selected time
  const [showTimeSlots, setShowTimeSlots] = useState(false); // State to control visibility of time slots
  const inputRef = useRef(null); // Ref for input field
  const listRef = useRef(null); // Ref for list

  // Function to handle time slot selection
  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
    setShowTimeSlots(false); // Hide time slots after selection
  };

  // Function to handle clicks outside the input field or the list
  const handleClickOutside = (event) => {
    if (
      inputRef.current && !inputRef.current.contains(event.target) &&
      listRef.current && !listRef.current.contains(event.target)
    ) {
      setShowTimeSlots(false); // Hide time slots when clicked outside the input field or the list
    }
  };

  // Attach click event listener when the component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Grid container>
      <Grid item xs={6} >
        <TextField

          fullWidth
          label="Start"
          value={selectedTime}
          variant="outlined"
          size="small"
          onClick={() => setShowTimeSlots(true)} // Show time slots when input field is clicked
          inputRef={inputRef}
           // Attach ref to the input field
        />
        {showTimeSlots && (
          <Box sx={{ overflowY: 'auto', maxHeight: '150px', zIndex:'1', position:'absolute', backgroundColor:'white' }} ref={listRef}>
            <List >
              {generateTimeSlots().map((time) => (
                <ListItem sx={{ml:1, mr:2}} key={time} disablePadding>
                  <ListItemButton onClick={() => handleTimeSlotClick(time)}>
                    {time}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}


