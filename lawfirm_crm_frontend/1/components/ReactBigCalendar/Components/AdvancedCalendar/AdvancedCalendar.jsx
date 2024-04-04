import React, { useCallback, useState, useEffect } from "react";
import Calendar from "../Calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import moment from "moment"; // Import moment library
import AddIcon from '@mui/icons-material/Add';
import { Card, Fab, IconButton, Tooltip } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

const DnDCalendar = withDragAndDrop(Calendar);


export default function AdvancedCalendar({ draggableAccessor, resizable, ...otherProps }) {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openAddEventDialog, setOpenAddEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    category: '',
    resource: '',
    location: ''
  });

  useEffect(() => {
    fetchEvents();
    const intervalId = setInterval(fetchEvents, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/events');
      const data = await response.json();
      const formattedEvents = data.map(event => ({
        id: event.id,
        start: moment(event.start).toDate(),
        end: moment(event.end).toDate(),
        title: event.title,
        category: event.category,
        resource: event.resource,
        location: event.location,
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const eventStyleGetter = useCallback((event) => {
    let eventStyle = {
      backgroundColor: '#3174ad',
      borderColor: '#2a4b8d',
      color: 'white',
    };

    switch (event.category) {
      case 'Appointment':
        eventStyle.backgroundColor = '#FFC107';
        eventStyle.borderColor = '#FFA000';
        break;
      case 'Court Date':
        eventStyle.backgroundColor = '#E91E63';
        eventStyle.borderColor = '#C2185B';
        break;
      case 'Hearing':
        eventStyle.backgroundColor = '#2196F3'; // Blue
        eventStyle.borderColor = '#1976D2'; // Darker blue
        break;
      case 'Mention':
        eventStyle.backgroundColor = '#4CAF50'; // Green
        eventStyle.borderColor = '#388E3C'; // Darker green
        break;
      case 'Ruling':
        eventStyle.backgroundColor = '#FF5722'; // Orange
        eventStyle.borderColor = '#E64A19'; // Darker orange
        break;
      case 'Judgement':
        eventStyle.backgroundColor = '#9C27B0'; // Deep Purple
        eventStyle.borderColor = '#7B1FA2'; // Darker deep purple
        break;
      case 'CRM Bring Up':
        eventStyle.backgroundColor = '#FF9800'; // Amber
        eventStyle.borderColor = '#F57C00'; // Darker amber
        break;
      case 'Event':
        eventStyle.backgroundColor = '#795548'; // Brown
        eventStyle.borderColor = '#5D4037'; // Darker brown
        break;
      case 'To-Do':
        eventStyle.backgroundColor = '#cddc39'; // Blue Grey
        eventStyle.borderColor = '#455A64'; // Darker blue grey
        break;
      case 'Blocked':
        eventStyle.backgroundColor = '#607D8B'; // Blue Grey
        eventStyle.borderColor = '#455A64'; // Darker blue grey
        break;
      // Add more cases for other categories with their respective colors
      default:
        break;
    }

    return {
      style: eventStyle,
    };
  }, []);

  const onEventDrop = useCallback(async (event) => {
    try {
      if (!event || !event.id) {
        console.error('Invalid event object:', event);
        return;
      }
  
      // Fetch the specific event first
      const fetchResponse = await axios.get(`http://localhost:8000/api/events/${event.id}`);
      if (fetchResponse.status === 200) {
        const eventData = fetchResponse.data;
        eventData.start = event.start.toISOString();
        eventData.end = event.end.toISOString();
        
        // Send a POST request to update the event
        const updateResponse = await axios.post(`http://localhost:8000/api/events/${event.id}`, eventData);
        
        if (updateResponse.status === 200) {
          // Event updated successfully, fetch the complete event object again
          const updatedEventResponse = await axios.get(`http://localhost:8000/api/events/${event.id}`);
          if (updatedEventResponse.status === 200) {
            const updatedEventData = updatedEventResponse.data;
            console.log('Event updated successfully:', updatedEventData);
            // You can perform further actions with the updated event data here
          } else {
            console.error('Failed to fetch updated event:', updatedEventResponse.statusText);
          }
        } else {
          // Failed to update event
          console.error('Failed to update event');
        }
      } else {
        console.error('Failed to fetch event:', fetchResponse.statusText);
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  }, []);
  
  const onEventResize = useCallback(async (event) => {
    try {
      if (!event || !event.id) {
        console.error('Invalid event object:', event);
        return;
      }
  
      // Fetch the specific event first
      const fetchResponse = await axios.get(`http://localhost:8000/api/events/${event.id}`);
      if (fetchResponse.status === 200) {
        const eventData = fetchResponse.data;
        eventData.start = event.start.toISOString();
        eventData.end = event.end.toISOString();
        
        // Send a POST request to update the event
        const updateResponse = await axios.post(`http://localhost:8000/api/events/${event.id}`, eventData);
        
        if (updateResponse.status === 200) {
          // Event updated successfully, fetch the complete event object again
          const updatedEventResponse = await axios.get(`http://localhost:8000/api/events/${event.id}`);
          if (updatedEventResponse.status === 200) {
            const updatedEventData = updatedEventResponse.data;
            console.log('Event updated successfully:', updatedEventData);
            // You can perform further actions with the updated event data here
          } else {
            console.error('Failed to fetch updated event:', updatedEventResponse.statusText);
          }
        } else {
          // Failed to update event
          console.error('Failed to update event');
        }
      } else {
        console.error('Failed to fetch event:', fetchResponse.statusText);
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  }, []);

// Modify the onSelectEvent function to include the category color
const onSelectEvent = useCallback((event) => {
  setSelectedEvent({
    ...event,
    categoryColor: eventStyleGetter(event).style.backgroundColor, // Include the category color
  });
}, [eventStyleGetter]);

  const handleCloseEventDetails = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  const handleFabClick = () => {
    setOpenAddEventDialog(true);
  };

  const handleAddEventDialogClose = () => {
    setOpenAddEventDialog(false);
  };

  const handleAddEvent = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/events', newEvent);
      if (response.status === 201) {
        setEvents([...events, response.data]);
        setOpenAddEventDialog(false);
        setNewEvent({
          title: '',
          start: new Date(),
          end: new Date(),
          category: '',
          resource: '',
          location: ''
        });
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
      {/* Menu to filter events */}
      <MenuList sx={{ flex: '0 0 auto', mb: 2, flexDirection: 'row', mr:2 }}>
        <MenuItem onClick={() => handleCategoryChange(null)} style={{ backgroundColor: '#2196f3' ,borderRadius: 10, marginBottom:2, fontSize: "0.6rem", textAlign: "center"}}>All</MenuItem>
        <MenuItem onClick={() => handleCategoryChange("Appointment")} style={{ backgroundColor: '#FFC107' ,borderRadius: 10, marginBottom:2, fontSize: "0.6rem", textAlign: "center"}}>Appointment</MenuItem>
        <MenuItem onClick={() => handleCategoryChange("Court Date")} style={{ backgroundColor: '#E91E63', marginBottom:2,borderRadius: 10,fontSize: "0.6rem", textAlign: "center" }}>Court Date</MenuItem>
        <MenuItem onClick={() => handleCategoryChange("Hearing")} style={{ backgroundColor: '#2196F3', marginBottom:2,borderRadius: 10,fontSize: "0.6rem", textAlign: "center" }}>Hearing</MenuItem>
        <MenuItem onClick={() => handleCategoryChange("Mention")} style={{ backgroundColor: '#4CAF50', marginBottom:2,borderRadius: 10,fontSize: "0.6rem", textAlign: "center" }}>Mention</MenuItem>
        <MenuItem onClick={() => handleCategoryChange("Ruling")} style={{ backgroundColor: '#FF5722', marginBottom:2,borderRadius: 10,fontSize: "0.6rem", textAlign: "center" }}>Ruling</MenuItem>
        <MenuItem onClick={() => handleCategoryChange("Judgement")} style={{ backgroundColor: '#9C27B0', marginBottom:2,borderRadius: 10,fontSize: "0.6rem", textAlign: "center" }}>Judgement</MenuItem>
        <MenuItem onClick={() => handleCategoryChange("CRM Bring Up")} style={{ backgroundColor: '#FF9800', marginBottom:2,borderRadius: 10,fontSize: "0.6rem", textAlign: "center" }}>CRM Bring Up</MenuItem>
        <MenuItem onClick={() => handleCategoryChange("Event")} style={{ backgroundColor: '#795548', marginBottom:2,borderRadius: 10,fontSize: "0.6rem", textAlign: "center" }}>Event</MenuItem>
        <MenuItem onClick={() => handleCategoryChange("To-Do")} style={{ backgroundColor: '#cddc39', marginBottom:2,borderRadius: 10,fontSize: "0.6rem", textAlign: "center" }}>To-Do</MenuItem>
        <MenuItem onClick={() => handleCategoryChange("Bloked")} style={{ backgroundColor: '#607D8B', marginBottom:2,borderRadius: 10,fontSize: "0.6rem", textAlign: "center" }}>Blocked-Out</MenuItem>
        {/* Add more menu items for different categories */}
        <Box sx={{textAlign:'center', mt:8}}>
          <Fab size="small" color="primary" aria-label="add" >
            <AddIcon sx={{}}/>
          </Fab>
        </Box>
      </MenuList>

 {/* Calendar component */}
 <div style={{ height: 500, flex: '1 1 auto' }}>
        <DnDCalendar
          events={selectedCategory ? events.filter((event) => event.category === selectedCategory) : events}
          onEventDrop={onEventDrop}
          onEventResize={onEventResize}
          onSelectEvent={onSelectEvent}
          eventPropGetter={eventStyleGetter}
          resizable={true}
          {...otherProps}
        />
      </div>

      {/* Floating Action Button */}
      <Box sx={{textAlign:'center', mt:8, position: 'fixed', bottom: '16px', right: '16px'}}>
        <Fab size="small" color="primary" aria-label="add" onClick={handleFabClick}>
          <AddIcon />
        </Fab>
      </Box>

      {/* Add Event Dialog */}
      <Dialog open={openAddEventDialog} onClose={handleAddEventDialogClose}>
        <DialogContent>
          <Typography variant="h7">Add New Event</Typography>
          <form onSubmit={handleAddEvent}>
            <label>Title:</label>
            <input type="text" name="title" value={newEvent.title} onChange={handleNewEventChange} />
            {/* Other input fields for event details */}
            <button type="submit">Add Event</button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Event details dialog */}
      <Dialog open={Boolean(selectedEvent)} onClose={handleCloseEventDetails}>
        <Card sx={{pl:8, pr:3, pb:5, color:'#424242', width:"30rem",fontFamily:'sans-serif'}}>
           {/* <Box sx={{display:'flex', flexDirection: 'row',}}> */}
            <Box sx={{textAlign:'right',  height:'2rem',}}>
              <MenuList>
                  {/* <IconButton sx={{mt:-1}} component={Link} to={`u/0/r/eventedit/${selectedEvent.id}`}><EditIcon label="edit" sx={{ fontSize:'1.3rem',}} /></IconButton> */}
                  <Tooltip title='edit'><IconButton
                    sx={{ mt: -1 }}
                    component={Link}
                    to={selectedEvent ? `u/0/r/eventedit/${selectedEvent.id}` : '#'}
                  >
                    <EditIcon label="edit" sx={{ fontSize: '1.3rem' }} />
                  </IconButton></Tooltip>
                  <Tooltip title='delete'><IconButton sx={{mt:-1}}> <DeleteOutlineIcon sx={{fontSize:'1.3rem',}}  /></IconButton></Tooltip>
                  <Tooltip title='mail'><IconButton sx={{mt:-1}}><MailOutlineIcon sx={{ fontSize:'1.3rem'}} /></IconButton></Tooltip>
                  <Tooltip title='more'><IconButton sx={{mt:-1}}><MoreVertIcon sx={{ fontSize:'1.3rem'}} /></IconButton></Tooltip>
                  <Tooltip title='close'><Fab disableElevation onClick={handleCloseEventDetails} size="small" aria-label="close"  sx={{mr:-1, boxShadow:'none'}}><CloseIcon /></Fab></Tooltip>
              </MenuList>
            </Box> 
          {/* </Box> */}
           <Box sx={{display: 'flex', alignItems: 'center', mt:2}}>
              {/* Colored box to display category color */}
              <Box sx={{ width: '1rem', height: '1rem', mr: 1, ml:-3.2, backgroundColor: selectedEvent?.categoryColor, borderRadius: '20%', border:'1' }} />
              {/* Event title */}
              <Typography variant="h6">{selectedEvent?.title}</Typography>
            </Box>
          {/* Format date with moment */}
          <Typography sx={{fontSize:'0.7rem', mt:-.6, mb:1}}>{moment(selectedEvent?.start).format('dddd, MMMM D')}</Typography>
          <Typography sx={{fontSize:'.95rem',}}>Start: {moment(selectedEvent?.start).format('h:mm A')}</Typography>
          <Typography sx={{fontSize:'.95rem',}}>End: {moment(selectedEvent?.end).format('h:mm A')}</Typography>
          <Typography sx={{fontSize:'.95rem',}}>Assigned: {selectedEvent?.resource}</Typography>
          <Typography sx={{fontSize:'.95rem',}}>Desc: {selectedEvent?.description}</Typography>
          <Typography sx={{fontSize:'.95rem',}}>Location: {selectedEvent?.location}</Typography>
          {/* Include other event details as needed */}
        </Card>
      </Dialog>
    </Box>
  );
}
