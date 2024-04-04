import { Typography } from '@mui/material'
import React from 'react'
import { Grid, Box, Paper } from '@mui/material'
import FirmDashboardChart from '../components/dashboardComponents/FirmDashboardChart'
import Divider from '@mui/material/Divider/Divider'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function FirmDashboard(){
  return (
    
  <Box>
    <Grid>
      <Typography sx={{m:2}}></Typography>
    </Grid>
  <Box sx={{ flexGrow: 1, }}>
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Box xs={{borderRadius: 0,}}>
            <Box display={"flex"} borderRadius={0}>
                  <Grid sm={4}>
                    <Box sx={{textAlign:"center"}}>
                        <Typography sx={{textAlign:"left",}}> Rate Average <HelpOutlineIcon sx={{fontSize:"0.8rem", m:"0.02rem", color:"primary"}}/>  </Typography>
                        <Box sx={{m:10}}>
                            You Have No Data
                        </Box>  
                    </Box> 
                    <Divider></Divider>
                    </Grid>
            
                <Divider orientation="vertical" flexItem ></Divider>
                <Grid sm={8} sx={{textAlign:"center", ml:5}}>
                    <FirmDashboardChart />   
                </Grid>
            </Box>
      </Box>
    </Grid>  
  </Grid>
  <Divider></Divider>
  <Grid container spacing={2}> 
  </Grid>
</Box>
   </Box>
);
}