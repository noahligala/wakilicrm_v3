// DashboardMenu.jsx

import React from "react";
import { MenuItem, MenuList } from "@mui/material";

export default function DashboardMenu({ handleEventTypeChange }) {
  return (
    <MenuList sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", p: 0 }}>
      <MenuItem onClick={() => handleEventTypeChange(null)}>All Events</MenuItem>
      <MenuItem onClick={() => handleEventTypeChange("Appointment")}>Appointments</MenuItem>
      <MenuItem onClick={() => handleEventTypeChange("Meeting")}>Meetings</MenuItem>
      <MenuItem onClick={() => handleEventTypeChange("Holiday")}>Holidays</MenuItem>
    </MenuList>
  );
}
