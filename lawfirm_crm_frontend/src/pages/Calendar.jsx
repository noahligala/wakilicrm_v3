// Calendar.jsx
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/system/Unstable_Grid/Grid";
import AdvancedCalendar from "../components/ReactBigCalendar/Components/AdvancedCalendar/AdvancedCalendar";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import SideCalendar from "../components/mui/calendar/SideCalendar"

export default function Calendar({ setTitle }) {
  const [title, setTitleState] = useState("Calendar");
  const [eventTypeFilter, setEventTypeFilter] = useState(null);

  useEffect(() => {
    setTitle(title); // Set the title when the component mounts
  }, [setTitle, title]);

  const handleEventTypeChange = (eventType) => {
    setEventTypeFilter(eventType);
  };

  return (
    <React.Fragment>
     <Box sx={{flexGrow: 1, ml: -5,mt:4, flexDirection: "row"}}>
        <Grid container spacing={3}>
            <Grid xs={9}>
                <Grid item xs={8} sx={{ height: ''}}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column", flexWrap: "nowrap" }}>
                    <Box>
                      <div style={{ }}>
                        <AdvancedCalendar eventTypeFilter={eventTypeFilter} />
                      </div>
                    </Box>
                  </Paper>
                </Grid>
            </Grid>
              <Divider orientation= "vertical" flexItem></Divider>
            <Grid item xs={1}>
                <Box alignContent={"center"}>
                  <SideCalendar />
                </Box>
            </Grid>
          </Grid>
     </Box>
    </React.Fragment>
  );
}
