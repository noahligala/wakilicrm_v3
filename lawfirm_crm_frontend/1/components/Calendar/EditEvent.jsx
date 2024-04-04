import React, { useEffect, useState } from "react";
import { Grid, TextField, Box } from "@mui/material";
import Button from "@mui/material/Button/Button";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Menu from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
export default function EditEvent() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null); // State to store selected date
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        // Fetch event details based on eventId
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/events/${eventId}`);
                setEvent(response.data);
                // Set the default selected date to the event start date
                setSelectedDate(new Date(response.data.startDate));
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };

        fetchEvent();
    }, [eventId]);

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

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Handle event update
    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/api/events/${eventId}`, { startDate: selectedDate });
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
                            {/*Menu Not Displaying properly */}
                            <Menu
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
                            </Menu>
                        </Grid>
                    </Grid>
                    <Grid xs={{ display: "flex", flexGrow: 1, mt: 2 }}>
                    </Grid>
                    <Grid sx={{ display: "flex", flexGrow: 1, mt: 2, flexDirection:'row' }}>
                        <Grid xs={6}>
                            <Box sm={6} >
                                {/* Inputs */}
                                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                                       <DatePicker size="normal" sx={{height:'2rem', backgroundColor:'red', fontSize:'0.5rem'}}/>
                                to:                                   
                                      <DatePicker />
                                    </LocalizationProvider>
                            </Box>
                        </Grid>
                        <Grid xs={6}>
                            
                        <Box sm={6} >
                                {/* Inputs */}
                                <LocalizationProvider  dateAdapter={AdapterDayjs}>
                                       <DatePicker size="normal" sx={{height:'2rem', backgroundColor:'red', fontSize:'0.5rem'}}/>
                                to:                                   
                                      <DatePicker />
                                    </LocalizationProvider>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}
