import React, { useEffect, useState } from "react";
import { Grid, TextField, Box } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import Button from "@mui/material/Button/Button";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import EditEventTimeSlots from "./TimeSlots";
// import Menu from "@mui/icons-material/Menu";
// import MenuItem from "@mui/material/MenuItem";

const options = [
  'Show some love to MUI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];
export default function EditEvent({ setTitle, title: initialTitle }) {
  const [title, setTitleState] = useState(initialTitle || "Update Event");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setTitle(title); // Set the title when the component mounts
  }, [setTitle, title]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    // Implement logic for each menu item click
    console.log("Action clicked:", action);
    handleCloseMenu();
  };
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details based on eventId
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/events/${eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  // Handle event update
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/events/${eventId}`, event);
      if (response.status === 200) {
        // Handle successful update
        console.log('Event updated successfully');
      } else {
        // Handle update failure
        console.error('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <Grid container>
           {event && (         
           <Grid xs spacing={2}>
             <Grid xs={12} sx={{ display: "flex", flexDirection: "row" }}>
               <Grid xs={6}>
                 {/* TextField with dynamic default value */}
                 <TextField
              fullWidth
              label="Add Title"
              id="standard-size-small"
              defaultValue={event.title}
              size="small"
              variant="standard"
            />
          </Grid>
          <Grid xs={6} sx={{ pl: 5, fontSize: "2rem" }}>
            <Button
              variant="contained"
              disableElevation
              sx={{ m: 2, textTransform: "none", fontSize: "1rem" }}
              onClick={handleUpdateEvent}
            >
              Save
            </Button>
            {/* More Actions Button with Dropdown */}
            <Button
              color="inherit"
              variant="contained"
              disableElevation
              aria-controls="more-actions-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
              sx={{ m: 2, textTransform: "none", fontSize: "1rem" }}
              endIcon={<ArrowDropDownIcon />}
          >
              More Actions
          </Button>
          {/* <Menu
              id="more-actions-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
              }}
              transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
              }}
          >
              <MenuItem onClick={() => handleMenuItemClick("print")}>Print</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("delete")}>Delete</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("duplicate")}>Duplicate</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("publish event")}>Publish Event</MenuItem>
              <MenuItem onClick={() => handleMenuItemClick("change owner")}>Change Owner</MenuItem>
          </Menu> */}
          </Grid>
        </Grid>
        <Grid sx={{ display: "flex", flexGrow: 1, mt: 2 }}>
          <Grid xs={6} sx={{display:'flex', flexDirection:'row'}}>
            <Box id="time-stma" sm={6}>
              {/* Inputs */}
                  <EditEventTimeSlots />
              input
            </Box>
            <Box sm={6}>
              {/* Inputs */}
                
            </Box>
          </Grid>
          <Grid xs={6}>
            Second Grid
          </Grid>
        </Grid>
      </Grid>
           )}
    </Grid>
  );
}

