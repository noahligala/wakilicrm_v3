import React from "react";
import { Box, Typography } from "@mui/material";
import { AppointmentStatusCode, EVENT_STATUS_COLORS } from "./CustomCalendar.constants";
import { Appointment } from "./CustomCalendar.types";

export default function AppointmentEvent({ appointment }) {
  const { location, status, resource, address } = appointment;
  const background = EVENT_STATUS_COLORS[status];

  return (
 
    <Box bgcolor={background} p={1} height="100%" color="black">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="caption">{location}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">{resource}</Typography>
        </Box>
      </Box>
      <Box mt={4}>
        {address.split("\n").map((add, index) => (
          <Typography key={index} variant="caption">{add}</Typography>
        ))}
      </Box>
    </Box>
  );
}
