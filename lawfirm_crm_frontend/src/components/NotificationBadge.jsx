// NotificationsBadge.jsx
import React, { useState, useEffect } from 'react';
import { Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/NotificationsNone';

export default function NotificationsBadge() {
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    // Replace this with your actual function to fetch notifications
    const fetchNotifications = async () => {
      // Fetch notifications from your API
      // ...

      // Update the notifications count
      setNotifications(/* the number of new notifications */);
    };

    fetchNotifications(8);
  }, []); // Add dependencies if necessary

  return (
    <IconButton color="inherit">
      <Badge badgeContent={notifications} color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}