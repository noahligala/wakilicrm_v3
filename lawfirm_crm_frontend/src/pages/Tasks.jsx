import React, { useState, useEffect } from 'react';
import { Stack, Button, Box, Grid, Paper, Typography } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import axios from 'axios';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/events');
        // Filter tasks to display only those in the category "To-Do" or with the is_task attribute set to true
        const filteredTasks = response.data.filter(task => task.category === "To-Do" || task.is_task === true);
        setTasks(filteredTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ ml: -7, mt: 5, width: '110%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Grid container>
          <Grid xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Grid sm={9}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem', mb: 2 }}> Tasks </Typography>
            </Grid>
            <Grid xs={3} >
              <Button variant="contained" disableElevation sx={{ fontSize: '0.6rem', mr: 0.5 }}>Types</Button>
              <Button variant="contained" disableElevation sx={{ fontSize: '0.6rem', mr: 0.5 }}>Feed</Button>
              <Button variant="contained" disableElevation sx={{ fontSize: '0.6rem', mr: 0.5 }}>List</Button>
              <Button variant="contained" disableElevation sx={{ fontSize: '0.6rem' }}>New</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Paper sx={{ borderRadius: 0, background: 'rgb(0,0,0,0.02)', height: '100%', width: '100%' }}>
        <Grid sx={{ m: 1, paddingTop: 1 }}>
          <Paper sx={{ borderRadius: 0 }}>
            <Grid container>
              <Grid xs={6} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p:1 }}>
                <Stack direction="row" spacing={1} sx={{ }}>
                  <Button variant="contained" disableElevation sx={{ fontSize: '0.6rem', mr: 1, borderRadius: 2, textTransform:'none'  }}>Outstanding</Button>
                  <Button variant="contained" disableElevation sx={{ fontSize: '0.6rem', mr: 1, borderRadius: 2, textTransform:'none', float:'right' }}>Completed</Button>
                      <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker
                          label="Date Created"
                          value={null} // Set the value accordingly
                          onChange={(newValue) => {
                            // Handle the change of the selected date
                          }}
                          slotProps={{ textField: { size: 'small', height:'.2rem' } }}
                          sx={{textAlign:'right'}}
                        />
                      </LocalizationProvider>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Paper sx={{ height: 430 , mb:-2 }}>
          <TableContainer>
            <Table size="small" sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.status}</TableCell>
                    <TableCell>{task.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <TablePagination
          rowsPerPageOptions={[15, 20, 25]}
          component="div"
          count={tasks.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{mt:2}}
        />
      </Paper>
    </Box>
  );
}
