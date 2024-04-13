import React, { useState } from "react";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Divider, Grid, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

function Tasks(){
  
}

export default function Personal({ setTitle }) {
  const [value, setValue] = useState(0);
  const [title, setTitleState] = useState("Personal");

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0,
  }));

  return (
    <Box sx={{ flexGrow: 1, }}>
        <Typography sx={{m:2}}>Today's Agenda</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item xs={{borderRadius: 0}}>
                <Box display={"flex"} borderRadius={0}>
                    <Grid sm={8}>
                        <Typography sx={{m:3, fontSize: '1.5rem', color: 'black'}}> 0 </Typography>
                        Tasks Done
                    </Grid>
                    <Divider orientation="vertical" flexItem ></Divider>
                    <Grid sm={4}>
                        <Typography> there are no tasks to be done</Typography>
                        <Box sx={{mt:2}}>
                            <Fab size="small" color="primary" aria-label="add" sx={{}}>
                                <AddIcon sx={{}}/>
                            </Fab>
                        </Box>    
                    </Grid>
                </Box>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item xs={{borderRadius: 0}}>
                <Box display={"flex"} borderRadius={0}>
                    <Grid sm={8}>
                        <Typography sx={{m:3, fontSize: '1.5rem', color: 'black'}}> 0 </Typography>
                        Calendar Events
                    </Grid>
                    <Divider orientation="vertical" flexItem ></Divider>
                    <Grid sm={4}>
                        <Typography> There are no events</Typography>
                        <Box sx={{mt:2}}>
                            <Fab size="small" color="primary" aria-label="add" sx={{}}>
                                <AddIcon sx={{}}/>
                            </Fab>
                        </Box>  
                    </Grid>
                </Box>
          </Item>
        </Grid>
        
        <Grid item xs={6}>Today's Agenda</Grid>
        <Grid item xs={6} >Billing Metrics</Grid>
        <Grid item xs={6}>
          <Item xs={{borderRadius: 0}}>
                <Box display={"flex"} borderRadius={0}>
                    <Grid sm={12} sx={{m:5}} >
                        <Typography sx={{fontWeight: 'bold', m:1}}> Billable Hours Target </Typography>
                        <Typography sx={{fontSize:'0.8rem', m:1}}>You haven't set a target yet</Typography>
                        <Button variant="contained">SET</Button>
                    </Grid>
                </Box>
          </Item>
        </Grid>
        <Grid item xs={6} >
          <Item xs={{borderRadius: 0}}  >
                <Box display={"flex"} >
                    <Grid sm={8} >
                        <Typography sx={{m:3, fontSize: '1.5rem', color: 'black'}}> 0 </Typography>
                        Calendar Events
                    </Grid>
                    <Divider orientation="vertical" flexItem ></Divider>
                    <Grid sm={4}>
                        <Typography> There are no events</Typography>
                        <Box sx={{mt:2}}>
                            <Fab size="small" color="primary" aria-label="add" sx={{}}>
                                <AddIcon sx={{}}/>
                            </Fab>
                        </Box>  
                    </Grid>
                </Box>
          </Item>
        </Grid>
        <Grid item xs={6} >
          <Item xs={{borderRadius: 0}}  >
                <Box display={"flex"} >
                    <Grid sm={8} >
                        <Typography sx={{m:3, fontSize: '1.5rem', color: 'black'}}> 0 </Typography>
                        Calendar Events
                    </Grid>
                    <Divider orientation="vertical" flexItem ></Divider>
                    <Grid sm={4}>
                        <Typography> There are no events</Typography>
                    </Grid>
                </Box>
          </Item>
        </Grid>
        
        <Grid item xs={6} marginTop={8}>
          <Item>xs=4</Item>
        </Grid>
       
      </Grid>
    </Box>
  );
}
