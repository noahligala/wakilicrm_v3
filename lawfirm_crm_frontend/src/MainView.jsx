// MainView.jsx
import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import { createTheme, ThemeProvider, Container, CssBaseline, Box, Toolbar, Grid } from '@mui/material';
import { Breadcrumbs, MenuList, Typography, Link } from '@mui/material';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Cases from './pages/Cases'
import Tasks from './pages/Tasks';
import Matters from './pages/Matters';
import Accounts from './pages/Accounts';
import About from './pages/About';
import Reports from './pages/Reports';
import Billing from './pages/Billing';
import FileManagement from './pages/FileManagement';
import Communications from './pages/Communications';
import Integrations from './pages/Integrations';
import { Route, Routes } from 'react-router-dom'; // Remove BrowserRouter import
import Activities from './pages/Activities';
import EditEvent from './components/Calendar/EditEvent';

const theme = createTheme({
  typography: {
    fontFamily: 'EB+Garamond',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});

function MainView() {
  const [title, setTitle] = useState('New');

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopBar title={title} />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Toolbar />
          <MenuList
            sx={{
              mt: 0,
              ml: 5,
              mb: -5,
            }}
            small
          >
            <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: '0.5rem' }}>
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Typography sx={{ fontSize: '0.6rem' }} color="primary">
                {title}
              </Typography>
            </Breadcrumbs>
          </MenuList>
          <Container maxWidth="lg" sx={{ mt: 4,}}>
            <Grid sx={{ marginTop: '.5rem', marginBottom: '.05rem' }}></Grid>
            <Grid>
              <Routes>
                <Route path="/dashboard" element={<Dashboard setTitle={setTitle} />} />
                <Route path="/v1/calendar" element={<Calendar setTitle={setTitle} />} />
                <Route path="/v1/calendar/u/0/r/eventedit/:eventId" element={<EditEvent setTitle={setTitle}  />} />
                <Route path="/user/{$user:id}" element={<Home  setTitle={setTitle}/>} />
                <Route path="/v1/about" element={<About  setTitle={setTitle}/>} />
                <Route path="/v1/tasks" element={<Tasks  setTitle={setTitle}/>} />
                <Route path="/v1/matters" element={<Matters  setTitle={setTitle}/>} />
                <Route path="/v1/contacts" element={<Reports  setTitle={setTitle}/>} />
                <Route path="/v1/activities" element={<Activities  setTitle={setTitle}/>} />
                <Route path="/v1/billing" element={<Billing setTitle={setTitle}/>} />
                <Route path="/v1/accounts" element={<Accounts setTitle={setTitle}/>} />
                <Route path="/v1/file-management/crm" element={<FileManagement  setTitle={setTitle}/>} />
                <Route path="/v1/communications" element={<Communications  setTitle={setTitle}/>} />
                <Route path="/v1/reports" element={<Reports  setTitle={setTitle}/>} />
                <Route path="/v1/integrations" element={<Integrations  setTitle={setTitle}/>} />
                <Route path="/v1/resource-center" element={<Home setTitle={setTitle}/>} />
                <Route path="/v1/cases" element={<Cases setTitle={setTitle}/>} />
                <Route path="/" element={<Home setTitle={setTitle} />} />
                {/* Add more routes here */}
              </Routes>
            </Grid>
          </Container>
        </Box>
      </Box>
      <Footer sx={{ pt: 4, position: 'fixed',bottom: '0' }} />
    </ThemeProvider>
  );
}

export default MainView;
