import React, { useState } from "react";
import { Grid, TextField, Box, List, ListItem, ListItemButton } from "@mui/material";
import Button from "@mui/material/Button/Button";

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

export default function EditEventTimeSlots() {
  const [selectedTime, setSelectedTime] = useState(""); // State to store selected time

  // Function to handle time slot selection
  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Select Time"
          value={selectedTime}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sx={{ overflowY: 'auto', maxHeight: '300px' }}>
        <List>
          {generateTimeSlots().map((time) => (
            <ListItem key={time} disablePadding>
              <ListItemButton onClick={() => handleTimeSlotClick(time)}>
                {time}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
