import React, { useEffect, useState } from "react";
import { TextField, Box, Fab, MenuItem, Select } from "@mui/material";
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

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
                <Fab disableElevation size="small" aria-label="close" sx={{  boxShadow: 'none', ml:-10 }}>
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
            <Grid item xs={6} sx={{ pl: 5, fontSize: "2rem" }}>
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
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row' }}>

          {/* Test Date and Time Pickers */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ pr: 2 }}>
              {/* Set default value for start time */}
              <TimePicker
                label="Start"
                defaultValue={startTime}
                onChange={handleStartTimeChange}
                slotProps={{ textField: { size: 'small'}, value:{fontSize:'0.05rem'}}}
                sx={{width: '35%', mr:2}} />
              <DatePicker
                label="Start Date"
                defaultValue={event.startDate}
                onChange={(date) => handleStartTimeChange(date.set('hour', startTime.hour()).set('minute', startTime.minute()))}
                formatDensity="dense" 
                slotProps={{ textField: { size: 'small' } }}
                sx={{width: '55%'}}  />
            </Box>
            <Box sx={{ pr: 2 }}>
              {/* Set default value for stop time */}
              <TimePicker
                label="End"
                defaultValue={stopTime}
                onChange={handleStopTimeChange}
                slotProps={{ textField: { size: 'small' } }}
                sx={{width: '30%', mr:2}} />
              <DatePicker
                label="End Date"
                defaultValue={event.endDate}
                onChange={(date) => handleStopTimeChange(date.set('hour', stopTime.hour()).set('minute', stopTime.minute()))}
                slotProps={{ textField: { size: 'small' } }}
                sx={{width: '60%'}}  />
            </Box>
        </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            Second Grid
          </Grid>
          <Grid item xs={12} sx={{flexDirection:'row'}}>
            <Box xs={4}>
              <FormControlLabel
                control={<Checkbox checked={allDay} onChange={handleAllDayChange} />}
                label="All Day"
              />
            </Box>
            <Grid xs={4} sx={{mt:5}}>
                  {/* Category Color */}
                <TextField
                  size="small"
                  label="category"
                  defaultValue={selectedCategory} />
                </Grid>
            {/* Location Input */}
            <Grid xs={4} sx={{mt:5}}>
            <TextField
              label="Location"
              value={location}
              variant="outlined"
              size="small"
              onChange={handleLocationChange}
            />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>

  );
}
