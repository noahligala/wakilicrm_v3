
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import UpdateIcon from '@mui/icons-material/Update';
import HubIcon from '@mui/icons-material/Hub';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FolderIcon from '@mui/icons-material/Folder';
import RepeatIcon from '@mui/icons-material/Repeat';
import GavelIcon from '@mui/icons-material/Gavel';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Box } from '@mui/material';

export const mainListItems = (
  <React.Fragment>
    <Box sx={{ m: 0 }}>
      <ListItemButton component={Link} to="/dashboard">
        <ListItemIcon>
          <HomeIcon sx={{ fontSize: '1.2rem' }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={Link} to="/v1/calendar">
        <ListItemIcon>
          <CalendarTodayIcon sx={{ fontSize: '1.2rem' }} />
        </ListItemIcon>
        <ListItemText primary="Calendar" />
      </ListItemButton>
    <ListItemButton component={Link} to="/v1/tasks">
      <ListItemIcon>
        <FormatListBulletedIcon  sx={{fontSize: '1.2rem'}} />
      </ListItemIcon>
      <ListItemText primary="Tasks" />
    </ListItemButton>
    <ListItemButton component={Link} to="/v1/matters">
      <ListItemIcon>
        <WorkOutlineIcon sx={{fontSize: '1.2rem'}}  />
      </ListItemIcon>
      <ListItemText primary="Matters" />
    </ListItemButton>
    <ListItemButton component={Link} to="/v1/contacts">
      <ListItemIcon>
        <PersonIcon  sx={{fontSize: '1.2rem'}} />
      </ListItemIcon>
      <ListItemText primary="Contacts" />
    </ListItemButton>
    <ListItemButton component={Link} to="/v1/activities">
      <ListItemIcon>
        <UpdateIcon  sx={{fontSize: '1.2rem'}} />
      </ListItemIcon>
      <ListItemText primary="Activities" />
    </ListItemButton>
    <ListItemButton component={Link} to="/v1/accounts/billing">
      <ListItemIcon>
        <PaymentIcon  sx={{fontSize: '1.2rem'}} />
      </ListItemIcon>
    <ListItemText primary="Billing" />
    </ListItemButton>
    <ListItemButton component={Link} to="/v1/account">
      <ListItemIcon>
        <AccountBalanceIcon sx={{fontSize: '1.2rem'}}  />
      </ListItemIcon>
    <ListItemText primary="Accounts" />
    </ListItemButton>
    <ListItemButton component={Link} to="/vi/documents">
      <ListItemIcon>
        <FolderIcon  sx={{fontSize: '1.2rem'}} />
      </ListItemIcon>
      <ListItemText primary="Documents" />
    </ListItemButton>
    <ListItemButton component={Link} to="/Communication">
      <ListItemIcon>
        <LocalPhoneIcon  sx={{fontSize: '1.2rem'}} />
      </ListItemIcon>
      <ListItemText primary="Communication" />
    </ListItemButton>
    <ListItemButton component={Link} to="/v1/reports">
      <ListItemIcon>
        <EqualizerIcon  sx={{fontSize: '1.2rem'}} />
      </ListItemIcon>
      <ListItemText  primary="Reports" />
    </ListItemButton>
    <ListItemButton component={Link} to="/v1/#">
      <ListItemIcon>
        <RepeatIcon sx={{fontSize: '1.2rem'}} />
      </ListItemIcon>
      <ListItemText primary="App Integrations" />
    </ListItemButton>
      </Box>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Management
    </ListSubheader>

    
        <ListItemButton component="a" href="/ruling">
          <ListItemIcon>
            <HubIcon />
          </ListItemIcon>
          <ListItemText primary="Resource Center" />
        </ListItemButton>
  
  </React.Fragment>
);

export const fileManagement = (
  <React.Fragment>
    <ListSubheader component="div">
       File Management
    </ListSubheader>

        <ListItemButton component={Link} to="/ruling">
          <ListItemIcon>
            <GavelIcon />
          </ListItemIcon>
          <ListItemText primary="Rulings" />
        </ListItemButton>
  </React.Fragment>
);
