import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const Footer = () => {
    function Copyright(props) {
        return (
            <Box
            sx={{
              backgroundColor: '#f0f0f0',
              padding: '2px',
              textAlign: 'center',
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              zIndex: 10000, // Ensures the footer remains on top of other content
            }}
          >
                <Typography variant="caption" color="text.secondary" {...props}>
                {'Copyright © '}
                <Link color="#f0f0f0f" href="mailto:ligalanoah@gmail.com/">
                    valeur
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            </Box>
        );
      }

    return (
        <footer style={{ backgroundColor: '#f0f0f0', padding: '20px',}}>
            <Copyright />
        </footer>
    );
};

export default Footer;

