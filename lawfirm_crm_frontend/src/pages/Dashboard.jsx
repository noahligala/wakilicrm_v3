import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Paper } from "@mui/material";
import Personal from '../components/dashboardComponents/Personal'
import FirmDashboard from "./FirmDashboard";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Dashboard({ setTitle }) {
  const [value, setValue] = useState(0);
  const [title, setTitleState] = useState("Dashboard");

  useEffect(() => {
    setTitle(title); // Set the title when the component mounts
  }, [setTitle, title]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ml: -7, mt: 5, width: '110%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start',}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
          <Tab label="Personal" {...a11yProps(0)} sx={{ borderLeft: 1 ,borderRight: 1,borderBottom: 1, borderColor: 'divider', textTransform: 'none' }}/>
          <Tab label="Firm" {...a11yProps(1)} sx={{ borderRight: 1,borderBottom: 1, borderColor: 'divider', textTransform: 'none' }} />
          <Tab label="Firm Feed" {...a11yProps(2)} sx={{ borderRight: 1,borderBottom: 1, borderColor: 'divider', textTransform: 'none' }} />
        </Tabs>
      </Box>
      <Paper sx={{borderRadius: 0, background: 'rgb(0,0,0,0.02)', height: '100%', width: '100%' }}>
        <CustomTabPanel value={value} index={0}>
          <Personal />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <FirmDashboard />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Paper>
    </Box>
  );
}
