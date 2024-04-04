import React from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';

export default function CreateFileForm() {
  return (
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography font variant="h6" gutterBottom>
            Create Client Case File
          </Typography>
          <form  noValidate autoComplete="off">
            <TextField
              required
              id="client-name"
              label="Client Name"
              fullWidth
              margin="normal"
            />
            <TextField
              required
              id="case-number"
              label="Case Number"
              margin="normal"
            />
            <TextField
              required
              id="case-number"
              label="Case Number"
              margin="normal"
            />
            <TextField id="filled-basic" label="Filled" variant="filled" margin='normal'/>
            <TextField
              required
              id="case-details"
              label="Case Details"
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" type="submit" style={{ marginTop: '20px' }}>
              Create
            </Button>
          </form>
        </Paper>
    </Grid>
  );
}