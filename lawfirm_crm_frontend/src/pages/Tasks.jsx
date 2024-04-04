import React from 'react';
import { Stack, Button, Box, Grid, Paper, Typography, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, } from '@mui/material';

export default function Tasks() {
  return (
    <Box sx={{ ml: -7, mt: 5, width: '110%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Grid container>
          <Grid xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Grid sm={9}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem', mb: 2 }}> Tasks </Typography>
            </Grid>
            <Grid xs={3} >
              <Button variant="contained" sx={{ fontSize: '0.6rem', mr: 0.4 }}>Types</Button>
              <Button variant="contained" sx={{ fontSize: '0.6rem', mr: 0.4 }}>Feed</Button>
              <Button variant="contained" sx={{ fontSize: '0.6rem', mr: 0.4 }}>List</Button>
              <Button variant="contained" sx={{ fontSize: '0.6rem' }}>New</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Paper sx={{ borderRadius: 0, background: 'rgb(0,0,0,0.02)', height: '100%', width: '100%' }}>
        <Grid sx={{ m: 1, paddingTop: 1 }}>
          <Paper sx={{ borderRadius: 0 }}>
            <Grid container>
              <Grid xs={6} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p:1 }}>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" sx={{ fontSize: '0.6rem', mr: 1, borderRadius:1,}}>Outstanding</Button>
                  <Button variant="outlined" sx={{ fontSize: '0.6rem' , borderRadius:1}}>Completed</Button>
                    <Grid sx={{display:'flex'}}>
                      <Box sx={{ ml: 1, overflow:'none', height:'.5rem' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker
                          label="Date Created"
                          value={null} // Set the value accordingly
                          onChange={(newValue) => {
                            // Handle the change of the selected date
                          }}
                          inputProps={{ style: { height: '200px' } }}
                        />
                        </LocalizationProvider>
                      </Box>
                    </Grid>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Paper>
          <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                            
                              </TableRow>
                            </TableHead>
                            <TableBody>
                                Body
                            </TableBody>
                          </Table>
          </TableContainer>
        </Paper>
      </Paper>
    </Box>
  );
}
