import { Typography, Box, Container, Tab, Tabs,  } from '@mui/material';
import React, { useEffect } from 'react'
import PropTypes from 'prop-types';

const FileManagement = ({ setTitle }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    useEffect(() => {
        setTitle('File Management'); // Set the title when the component mounts
      }, [setTitle]);
    // const [title, se

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
            <Box sx={{ p: 3 }}>
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
    };

  return (
    <React.Fragment sx={{}}>
            <Container sx={{marginTop: 0, marginLeft: -15}}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Client Intake" {...a11yProps(0)} />
                  <Tab label="Storage" {...a11yProps(1)} />
                  <Tab label="Archive" {...a11yProps(2)} />
                  <Tab label="Reports" {...a11yProps(3)} />
                  <Tab label="Updates" {...a11yProps(4)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                  Upload
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                  Storage
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                  PENDING
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                  UPDATES
              </CustomTabPanel>
              <CustomTabPanel value={value} index={4}>
                  CLOSED
              </CustomTabPanel>
            </Container>
    </React.Fragment>
  )
}

export default FileManagement