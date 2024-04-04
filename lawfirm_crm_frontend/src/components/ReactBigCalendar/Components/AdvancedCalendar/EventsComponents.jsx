// EventsComponent.jsx
import React, { useEffect, useState } from 'react';
import moment from 'moment'; // Import moment for date formatting
import axios from "axios";

export function EventsComponents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/events');
            const data = response.data;
            const formattedEvents = data.map(event => ({
                id: event.id,
                start: moment(event.start).toDate(),
                end: moment(event.end).toDate(),
                title: event.title, // Use the title property from the backend
                category: event.category, // Assuming you have a category property in your event object
            }));
            setEvents(formattedEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    return null; // This component does not render anything
}

export default EventsComponents;
