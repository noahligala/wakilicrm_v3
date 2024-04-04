import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react'; // Import useEffect from 'react'

export default function EditEventRedirect() {
    const navigate = useNavigate();
    const { eventId } = useParams(); // Make sure to import useParams from 'react-router-dom'
  
    // Redirect to the EditEvent component with the corresponding event ID
    useEffect(() => {
      navigate(`/v1/calendar/u/0/r/eventedit/${eventId}`);
    }, [navigate, eventId]);
  
    // Render null (or any loading indicator) since the navigation happens in useEffect
    return null;
}
