import React, { } from 'react';
import { Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/NotificationsNone';
import PersonIcon from '@mui/icons-material/Person';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import { styled, alpha } from '@mui/material/styles';
import { Badge, Divider, List, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {LogOut} from './LogOut';
import NotificationsBadge from './NotificationBadge';
import Avatar from '@mui/material/Avatar';

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(7),
        },
      }),
    },
  }),
);

function TopBar({ title }) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  const handleSearch = (e) => {
    e.preventDefault();
    // Add logic to handle search here (e.g., send API request)
    console.log('Search Query:', e.target.elements.search.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {/* AppBar component */}
      <AppBar position="absolute" sticky open={open}>
        {/* Toolbar component */}
        <Toolbar>
          {/* IconButton for opening the drawer */}
          {/* Adjust the margin-right as needed */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '20px', // Adjust the margin as needed
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {/* Typography component for the title */}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          {/* Search component */}
          {/* Existing code for search component... */}

          {/* Notification IconButton */}
          <IconButton color="inherit">
            <NotificationsBadge>
              <NotificationsIcon />
            </NotificationsBadge>
          </IconButton>

          {/* Person IconButton */}
          <IconButton color="inherit" onClick={handleClick}>
            <Badge color="secondary">
              <PersonIcon />
            </Badge>
          </IconButton>

          {/* Menu component */}
                
                <Menu
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleClose}
                    width="20rem"
                      >
                      
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Typography>Username</Typography>
                    <MenuItem >Profile</MenuItem>
                    <MenuItem >My account</MenuItem>
                    <MenuItem onClick={LogOut}>Logout</MenuItem>
                  </Menu>
                
        </Toolbar>
      </AppBar>

      {/* Drawer component */}
      <Drawer variant="permanent" position="sticky" open={open}>
        {/* Toolbar component */}
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            color: 'blue'
          }}
        >
          {/* IconButton for closing the drawer */}
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>

        {/* Divider component */}
        <Divider />

        {/* List component for main items */}
        <List dense component="nav"> {/* Adjust the font size of main items */}
          <Typography > {mainListItems} </Typography>
          <Divider sx={{ my: 0 }} />
          {/* Secondary list items */}
          {secondaryListItems}
        </List>
      </Drawer>
    </React.Fragment>
  );
}

export default TopBar;