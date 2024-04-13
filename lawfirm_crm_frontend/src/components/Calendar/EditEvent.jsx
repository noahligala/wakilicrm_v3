import React, { useEffect, useState } from "react";
import { TextField, Box, Fab, } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers/icons";
import Button from "@mui/material/Button/Button";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';

const ProSpan = styled('span')({
  display: 'inline-block',
  height: '1em',
  width: '1em',
  verticalAlign: 'middle',
  marginLeft: '0.3em',
  marginBottom: '0.08em',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({ componentName, valueType, isProOnly }) {
  const content = (
    <span>
      <strong>{componentName}</strong> for {valueType} editing
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a
            href="https://mui.com/x/introduction/licensing/#pro-plan"
            aria-label="Included on Pro package"
          >
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

export default function EditEvent({ setTitle, title: initialTitle }) {
  const [title, setTitleState] = useState(initialTitle || "Update Event");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [allDay, setAllDay] = useState(false);
  const [event, setEvent] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [stopTime, setStopTime] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [location, setLocation] = useState("");
  const [appointmentID, setAppointmentID] = useState("");
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [address, setAddress] = useState("");

  const { eventId } = useParams();

  useEffect(() => {
    setTitle(title);
  }, [setTitle, title]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/events/${eventId}`);
        setEvent(response.data);
        setStartTime(response.data.startTime);
        setStopTime(response.data.stopTime);
        setSelectedCategory(response.data.category); // Set selected category
        setLocation(response.data.location); // Set location
        setAppointmentID(response.data.appointment_id); // Set appointment ID
        setAppointmentStatus(response.data.appointment_status); // Set appointment status
        setAddress(response.data.address); // Set address
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchEvent();
    fetchCategories();
  }, [eventId]);

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    // Update the stop time if it's after the new start time
    if (stopTime < time) {
      setStopTime(time);
    }
  };

  const handleStopTimeChange = (time) => {
    setStopTime(time);
  };

  const handleAllDayChange = (event) => {
    setAllDay(event.target.checked);
    if (event.target.checked) {
      setStartTime("00:00");
      setStopTime("23:59");
    } else {
      setStartTime(event.startTime);
      setStopTime(event.stopTime);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/events/${eventId}`, {
        startTime,
        stopTime,
        category: selectedCategory,
        location,
        appointment_id: appointmentID,
        appointment_status: appointmentStatus,
        address,
      });
      if (response.status === 200) {
        console.log('Event updated successfully');
      } else {
        console.error('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <Grid container>
      {event && (
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: "flex", flexDirection: "row", mt: 4 }}>
            <Tooltip title='Cancel'>
              <Link to="/v1/calendar">
                <Fab disableElevation size="small" aria-label="close" sx={{ boxShadow: 'none', ml: -10 }}>
                  <CloseIcon />
                </Fab>
              </Link>
            </Tooltip>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Add Title"
                defaultValue={event.title}
                size="small"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sx={{ pl: 5, fontSize: "2rem" }}>
              <Button
                variant="contained"
                disableElevation
                sx={{ m: 2, textTransform: "none", fontSize: "1rem" }}
                onClick={handleUpdateEvent}
              >
                Save
              </Button>
              <Button
                color="inherit"
                variant="contained"
                disableElevation
                aria-controls="more-actions-menu"
                aria-haspopup="true"
                sx={{ m: 2, textTransform: "none", fontSize: "1rem" }}
                endIcon={<ArrowDropDownIcon />}
              >
                More Actions
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
          {/* End date */}
          <TextField
              size="small"
              label="Start Date"
              defaultValue={event.startTime}
              onChange={(date) => handleStopTimeChange(date.set('hour', stopTime.hour()).set('minute', stopTime.minute()))}
              type="datetime-local"
              sx={{ width: '50%', mt: 2, mr:2}}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* End date */}
            <TextField
              size="small"
              label="End Date"
              defaultValue={event.Date}
              onChange={(date) => handleStopTimeChange(date.set('hour', stopTime.hour()).set('minute', stopTime.minute()))}
              type="datetime-local"
              sx={{ width: '50%', mt: 2, mr:2}}
              InputLabelProps={{
                shrink: true,
              }}
            />
            
          </Grid>
          <Grid item xs={12}>
            
          <Grid item xs={12}>
            <Box xs={12}>
              <TextField
                size="small"
                label="Appointment ID"
                defaultValue={appointmentID}
                onChange={(e) => setAppointmentID(e.target.value)}
                sx={{mt:2}}
              />
            </Box>
            <Box xs={12}>
              <TextField
                size="small"
                label="Appointment Status"
                defaultValue={appointmentStatus}
                onChange={(e) => setAppointmentStatus(e.target.value)}
                sx={{mt:5}}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              label="Address"
              defaultValue={address}
              onChange={(e) => setAddress(e.target.value)}
              multiline
              rows={4}
              sx={{mt:5}}
            />
            
          </Grid>
          </Grid>
          <Grid item xs={12} sx={{ flexDirection: 'row' }}>
            <Box xs={4}>
              <FormControlLabel
                control={<Checkbox checked={allDay} onChange={handleAllDayChange} />}
                label="All Day"
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleUpdateEvent}
              variant="contained"
              disableElevation
              size="small"
              sx={{ textTransform: 'none' }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
