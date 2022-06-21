import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span style={{ cursor: 'pointer' }} onClick={() => props.setPage(0)}>Loan calculator</span>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}